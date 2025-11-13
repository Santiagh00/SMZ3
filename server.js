// server.js (con archivo CSV)
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;
const COMENTARIOS_FILE = "comentarios.csv";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Crear archivo CSV si no existe
if (!fs.existsSync(COMENTARIOS_FILE)) {
  fs.writeFileSync(COMENTARIOS_FILE, "ID,Nombre,Correo,Comentario,Fecha\n", "utf-8");
  console.log("✅ Archivo comentarios.csv creado");
}

// Función para generar ID único
function generarID() {
  return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Función para escapar texto CSV
function escaparCSV(texto) {
  if (texto.includes(",") || texto.includes('"') || texto.includes("\n")) {
    return '"' + texto.replace(/"/g, '""') + '"';
  }
  return texto;
}

// Ruta para guardar comentario
app.post("/api/comentarios", (req, res) => {
  const { nombre, correo, comentario } = req.body;

  if (!nombre || !correo || !comentario) {
    return res.status(400).json({ 
      success: false, 
      error: "Faltan campos obligatorios" 
    });
  }

  const id = generarID();
  const fecha = new Date().toISOString();
  
  // Crear línea CSV
  const linea = [
    id,
    escaparCSV(nombre),
    escaparCSV(correo),
    escaparCSV(comentario),
    fecha
  ].join(",") + "\n";

  // Agregar al archivo
  fs.appendFile(COMENTARIOS_FILE, linea, "utf-8", (err) => {
    if (err) {
      console.error("Error al guardar comentario:", err);
      res.status(500).json({ 
        success: false, 
        error: "Error al guardar el comentario" 
      });
    } else {
      console.log(`✅ Comentario guardado con ID: ${id}`);
      res.json({ 
        success: true, 
        message: "Comentario guardado correctamente",
        id: id
      });
    }
  });
});

// Ruta para ver todos los comentarios
app.get("/api/comentarios", (req, res) => {
  fs.readFile(COMENTARIOS_FILE, "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer comentarios:", err);
      return res.status(500).json({ error: err.message });
    }

    const lineas = data.trim().split("\n");
    const comentarios = [];

    // Saltar la primera línea (encabezados)
    for (let i = 1; i < lineas.length; i++) {
      const partes = lineas[i].split(",");
      if (partes.length >= 5) {
        comentarios.push({
          id: partes[0],
          nombre: partes[1].replace(/^"|"$/g, '').replace(/""/g, '"'),
          correo: partes[2].replace(/^"|"$/g, '').replace(/""/g, '"'),
          comentario: partes[3].replace(/^"|"$/g, '').replace(/""/g, '"'),
          fecha: partes[4]
        });
      }
    }

    res.json({ success: true, comentarios: comentarios.reverse() });
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