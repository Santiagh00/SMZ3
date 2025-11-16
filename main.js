// ===== Datos de las motos =====
const motosData = {
  urbana: {
    titulo: "Moto Urbana",
    imagen: "public/MotoUrbana.png",
    descripcion: `
      <h3>Descripción</h3>
      <p>
        Las motocicletas urbanas son la elección perfecta para quienes buscan movilidad eficiente en la ciudad.
        Diseñadas para enfrentar el tráfico diario, estas motos combinan practicidad, economía y estilo en un paquete compacto.
      </p>

      <h3>Características principales</h3>
      <ul>
        <li>Motor de baja a media cilindrada (entre 110cc y 250cc).</li>
        <li>Consumo de combustible muy eficiente.</li>
        <li>Diseño liviano y ágil para maniobrar en ciudad.</li>
        <li>Mantenimiento económico y sencillo.</li>
      </ul>

      <h3>Ventajas</h3>
      <ul>
        <li>Excelente para principiantes y uso diario.</li>
        <li>Fáciles de estacionar y muy maniobrables.</li>
        <li>Coste de mantenimiento bajo.</li>
      </ul>

      <h3>Desventajas</h3>
      <ul>
        <li>No son ideales para viajes largos.</li>
        <li>Menor potencia en comparación con otros tipos de motos.</li>
      </ul>
    `
  },

  deportiva: {
    titulo: "Moto Deportiva",
    imagen: "public/MotoDeportiva.png",
    descripcion: `
      <h3>Descripción</h3>
      <p>
        Las motocicletas deportivas están diseñadas para la velocidad y el rendimiento.
        Con motores potentes, carenados aerodinámicos y posiciones agresivas, estas motos son la representación pura de la adrenalina sobre dos ruedas.
      </p>

      <h3>Características principales</h3>
      <ul>
        <li>Motor de alta cilindrada (250cc a 1000cc o más).</li>
        <li>Diseño aerodinámico para máxima velocidad.</li>
        <li>Suspensiones y frenos de alto rendimiento.</li>
        <li>Posición de manejo inclinada hacia adelante.</li>
      </ul>

      <h3>Ventajas</h3>
      <ul>
        <li>Gran velocidad y aceleración.</li>
        <li>Tecnología avanzada y materiales de alta calidad.</li>
        <li>Diseño atractivo y agresivo.</li>
      </ul>

      <h3>Desventajas</h3>
      <ul>
        <li>Incomodidad en trayectos largos.</li>
        <li>Mayor consumo de combustible.</li>
        <li>Costos de mantenimiento elevados.</li>
      </ul>
    `
  },

  cruiser: {
    titulo: "Moto Cruiser",
    imagen: "public/MotoCruiser.png",
    descripcion: `
      <h3>Descripción</h3>
      <p>
        Las motocicletas Cruiser destacan por su estilo clásico y su comodidad.
        Son perfectas para recorridos largos y relajados, con motores de par elevado y posiciones de manejo ergonómicas.
      </p>

      <h3>Características principales</h3>
      <ul>
        <li>Motor de media a alta cilindrada.</li>
        <li>Asiento bajo y posición relajada.</li>
        <li>Diseño retro inspirado en las motos clásicas.</li>
        <li>Enfoque en el confort y la estabilidad.</li>
      </ul>

      <h3>Ventajas</h3>
      <ul>
        <li>Excelente comodidad en carretera.</li>
        <li>Estilo icónico y elegante.</li>
        <li>Gran estabilidad a velocidades medias.</li>
      </ul>

      <h3>Desventajas</h3>
      <ul>
        <li>Pesadas y menos maniobrables en ciudad.</li>
        <li>No están pensadas para altas velocidades ni caminos off-road.</li>
      </ul>
    `
  },

  "doble-proposito": {
    titulo: "Moto Doble Propósito",
    imagen: "public/MotoDobleProposito.png",
    descripcion: `
      <h3>Descripción</h3>
      <p>
        Las motocicletas doble propósito combinan lo mejor de ambos mundos: ciudad y aventura.
        Son ideales para quienes disfrutan de explorar caminos sin asfaltar sin renunciar a la comodidad urbana.
      </p>

      <h3>Características principales</h3>
      <ul>
        <li>Suspensión alta y ruedas mixtas.</li>
        <li>Posición de conducción erguida y cómoda.</li>
        <li>Motor versátil y duradero.</li>
        <li>Chasis reforzado para terrenos difíciles.</li>
      </ul>

      <h3>Ventajas</h3>
      <ul>
        <li>Excelente adaptación a cualquier tipo de terreno.</li>
        <li>Gran resistencia y durabilidad.</li>
        <li>Ideal para viajes largos y aventuras.</li>
      </ul>

      <h3>Desventajas</h3>
      <ul>
        <li>Altura del asiento puede ser incómoda para personas bajas.</li>
        <li>No tan eficientes en ciudad como las urbanas puras.</li>
      </ul>
    `
  }
};

// ===== Referencias =====
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

// ===== Función para abrir modal =====
function abrirModal(tipo) {
  const moto = motosData[tipo];
  if (!moto) return;

  modalBody.innerHTML = `
    <div class="modal-header">
      <h2>${moto.titulo}</h2>
      <span class="close" onclick="cerrarModal()">&times;</span>
    </div>
    <div class="modal-body">
      <img src="${moto.imagen}" alt="${moto.titulo}" class="modal-img">
      ${moto.descripcion}
    </div>
  `;
  modal.style.display = "block";
}

// ===== Función para cerrar modal =====
function cerrarModal() {
  modal.style.display = "none";
}

// Cerrar modal al hacer clic fuera
window.onclick = function (event) {
  if (event.target === modal) {
    cerrarModal();
  }
};

// comentarios eliminados del JS porque la sección fue removida del HTML

// ===== Manejo de comentarios (solo en `nosotros.html`) =====
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('comentarioForm');
  if (!form) return; // solo ejecutar en pages que tengan el formulario

  const btnEnviar = document.getElementById('btnEnviar');
  const mensajeExito = document.getElementById('mensajeExito');
  const commentsList = document.getElementById('commentsList');

  function renderComments(items) {
    if (!commentsList) return;
    if (!items || items.length === 0) {
      commentsList.innerHTML = '<div class="text-muted">No hay comentarios todavía.</div>';
      return;
    }
    commentsList.innerHTML = items.map(c => {
      // server.js devuelve objetos con campos: id,nombre,correo,comentario,fecha
      return `
        <div class="card p-3 mb-3">
          <div class="d-flex justify-content-between">
            <div><strong>${escapeHtml(c.nombre)}</strong></div>
            <div class="text-muted small">${new Date(c.fecha).toLocaleString()}</div>
          </div>
          <div class="mt-2">${escapeHtml(c.comentario)}</div>
        </div>
      `;
    }).join('');
  }

  function escapeHtml(s){ if(!s && s !== 0) return ''; return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m]); }

  async function loadComments(){
    try{
      const res = await fetch('http://localhost:3000/api/comentarios');
      if (!res.ok) throw new Error('error');
      const data = await res.json();
      if (data && data.success) renderComments(data.comentarios);
      else renderComments([]);
    }catch(e){
      console.error(e);
      if (commentsList) commentsList.innerHTML = '<div class="text-danger">No se pudieron cargar los comentarios. Asegúrate de que el servidor esté corriendo en http://localhost:3000</div>';
    }
  }

  btnEnviar.addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const comentario = document.getElementById('comentario').value.trim();
    if (!nombre || !correo || !comentario) {
      // mostrar error inline
      const err = document.createElement('div'); err.className = 'text-danger mb-2'; err.textContent = 'Por favor completa todos los campos.';
      form.prepend(err);
      setTimeout(()=> err.remove(), 4000);
      return;
    }

    btnEnviar.disabled = true; btnEnviar.textContent = 'Enviando...';
    try{
      const res = await fetch('http://localhost:3000/api/comentarios', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ nombre, correo, comentario })
      });
      const data = await res.json();
      if (data && data.success) {
        mensajeExito.style.display = 'block';
        await new Promise(r=>setTimeout(r,2500));
        form.reset();
        mensajeExito.style.display = 'none';
        loadComments();
      } else {
        const err = document.createElement('div'); err.className = 'text-danger mb-2'; err.textContent = data && data.error ? data.error : 'Error al enviar comentario';
        form.prepend(err);
        setTimeout(()=> err.remove(), 4000);
      }
    }catch(err){
      console.error(err);
      const errNode = document.createElement('div'); errNode.className = 'text-danger mb-2';
      errNode.textContent = 'Error de conexión. Comprueba que http://localhost:3000 esté corriendo.';
      form.prepend(errNode);
      setTimeout(()=> errNode.remove(), 6000);
    }
    finally{ btnEnviar.disabled = false; btnEnviar.textContent = 'Enviar Comentario'; }
  });

  // cargar al inicio
  loadComments();
});

// ===== Theme toggle (global) =====
(function(){
  const STORAGE_KEY = 'mb_theme'; // 'light' or 'dark'

  function getSaved(){
    try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; }
  }

  function save(val){ try { localStorage.setItem(STORAGE_KEY, val); } catch(e){} }

  function applyTheme(name){
    const root = document.documentElement;
    if (name === 'dark') root.classList.add('dark-theme');
    else root.classList.remove('dark-theme');
  }

  function createButton(){
    if (document.querySelector('.theme-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label','Cambiar tema claro/oscuro');
    btn.title = 'Cambiar tema';
    btn.textContent = '🌙';
    btn.addEventListener('click', () => {
      const cur = (getSaved() === 'dark') ? 'light' : 'dark';
      applyTheme(cur);
      save(cur);
      btn.textContent = cur === 'dark' ? '🌞' : '🌙';
    });
    document.body.appendChild(btn);
    return btn;
  }

  // Initialize theme from saved or prefers-color-scheme
  const saved = getSaved();
  let init = saved;
  if (!init) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    init = prefersDark ? 'dark' : 'light';
  }
  applyTheme(init);
  const btn = createButton();
  if (btn) btn.textContent = init === 'dark' ? '🌞' : '🌙';
})();