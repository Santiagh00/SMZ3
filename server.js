// server.js (SQLite-backed comentarios, import CSV on first run)
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;
const COMENTARIOS_FILE = path.join(__dirname, 'comentarios.csv');
const DB_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DB_DIR, 'comments.db');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Ensure DB directory
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

// Open DB
const db = new sqlite3.Database(DB_PATH);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    correo TEXT,
    comentario TEXT,
    fecha TEXT
  )`);
});

// If CSV exists and DB is empty, import CSV rows
function importCsvIfNeeded() {
  db.get('SELECT COUNT(*) as cnt FROM comments', (err, row) => {
    if (err) return console.error('DB count error', err);
    if (row && row.cnt > 0) return; // already have data
    if (!fs.existsSync(COMENTARIOS_FILE)) return;
    const data = fs.readFileSync(COMENTARIOS_FILE, 'utf-8').trim();
    if (!data) return;
    const lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // naive CSV parse: split, remove surrounding quotes
      const parts = line.match(/(?:\s*"((?:""|[^"])*)"\s*|\s*([^,]+)\s*)/g);
      if (!parts) continue;
      // fallback simple split by comma and strip quotes
      const cols = line.split(',');
      if (cols.length < 5) continue;
      const id = cols[0];
      const nombre = cols[1].replace(/^"|"$/g, '').replace(/""/g, '"');
      const correo = cols[2].replace(/^"|"$/g, '').replace(/""/g, '"');
      const comentario = cols[3].replace(/^"|"$/g, '').replace(/""/g, '"');
      const fecha = cols[4];
      db.run('INSERT OR IGNORE INTO comments (id,nombre,correo,comentario,fecha) VALUES (?,?,?,?,?)', [id,nombre,correo,comentario,fecha]);
    }
    console.log('Imported CSV into SQLite (if any rows were present).');
  });
}

importCsvIfNeeded();

// Helper to generate ID
function generarID() {
  return Date.now() + Math.random().toString(36).substr(2, 9);
}

// POST -> store comment (writes to DB and appends CSV as backup)
app.post('/api/comentarios', (req, res) => {
  const { nombre, correo, comentario } = req.body;
  if (!nombre || !correo || !comentario) return res.status(400).json({ success:false, error:'Faltan campos' });
  const id = generarID();
  const fecha = new Date().toISOString();
  db.run('INSERT INTO comments (id,nombre,correo,comentario,fecha) VALUES (?,?,?,?,?)', [id,nombre,correo,comentario,fecha], function(err){
    if (err) {
      console.error('DB insert error', err);
      return res.status(500).json({ success:false, error:'Error al guardar en DB' });
    }
    // append to CSV as a backup
    try {
      if (!fs.existsSync(COMENTARIOS_FILE)) fs.writeFileSync(COMENTARIOS_FILE, 'ID,Nombre,Correo,Comentario,Fecha\n', 'utf-8');
      const esc = (s) => (s.includes(',')||s.includes('"')||s.includes('\n')) ? '"'+s.replace(/"/g,'""')+'"' : s;
      const linea = [id, esc(nombre), esc(correo), esc(comentario), fecha].join(',') + '\n';
      fs.appendFile(COMENTARIOS_FILE, linea, 'utf-8', (err) => {
        if (err) console.warn('No se pudo escribir CSV backup', err);
      });
    } catch(e){ console.warn('No se pudo escribir CSV backup', e); }
    res.json({ success:true, id });
  });
});

// GET -> list comments (most recent first)
app.get('/api/comentarios', (req,res) => {
  db.all('SELECT id,nombre,correo,comentario,fecha FROM comments ORDER BY fecha DESC', [], (err, rows) => {
    if (err) { console.error('DB read error', err); return res.status(500).json({ success:false, error: err.message }); }
    res.json({ success:true, comentarios: rows });
  });
});

// Servir la página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Ver comentarios en http://localhost:${PORT}/api/comentarios`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  db.close(() => {
    console.log('DB cerrada');
    process.exit(0);
  });
});