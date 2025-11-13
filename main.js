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

// ===== Formulario de comentarios =====
document.addEventListener("DOMContentLoaded", () => {
  const btnEnviar = document.getElementById("btnEnviar");
  const mensajeExito = document.getElementById("mensajeExito");
  const form = document.getElementById("comentarioForm");

  if (!btnEnviar) {
    console.error("❌ No se encontró el botón btnEnviar");
    return;
  }

  btnEnviar.addEventListener("click", async function() {
    console.log("🔵 CLICK EN BOTÓN");
    
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    // Validar
    if (!nombre || !correo || !comentario) {
      alert("⚠️ Por favor completa todos los campos");
      return;
    }

    console.log("🟢 Datos válidos, enviando...");

    // Deshabilitar botón
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";

    try {
      const response = await fetch("http://localhost:3000/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, comentario })
      });

      const data = await response.json();
      console.log("📡 Respuesta del servidor:", data);

      if (data.success) {
        console.log("✅ MOSTRANDO MENSAJE - INICIO");
        
        // Mostrar mensaje
        mensajeExito.style.display = "block";
        console.log("✅ Display = block");
        
        console.log("⏰ Esperando 6 segundos...");
        
        // ESPERAR 6 SEGUNDOS antes de hacer CUALQUIER cosa
        await new Promise(resolve => setTimeout(resolve, 6000));
        
        console.log("⏰ 6 segundos pasaron");
        console.log("🧹 Limpiando formulario...");
        form.reset();
        
        console.log("👋 Ocultando mensaje...");
        mensajeExito.style.display = "none";
        
        console.log("✅ TODO TERMINADO");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Error de conexión. Asegúrate de que el servidor esté corriendo.");
      console.error(error);
    } finally {
      // Rehabilitar botón
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Enviar Comentario";
    }
  });
});