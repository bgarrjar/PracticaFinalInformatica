// Mostrar nombre del usuario que inició sesión
const nombre = localStorage.getItem("nombre");
if (!nombre || rol !== "usuario") {
    window.location.href = "login.html";
} else {
    document.getElementById("userName").innerText = "Hola, " + nombre;
}
// Crear el mapa centrado en Madrid,Chamberí
const map = L.map("map").setView([40.4332, -3.7075], 15);

// Cargar mapa de OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

// Guardar cargador seleccionado
let cargadorSeleccionado = null;

// Cargar cargadores desde el backend
async function cargarCargadores() {
    try {
        const response = await fetch("/api/cargadores");
        const cargadores = await response.json();

        cargadores.forEach(c => {
            const marker = L.marker([c.lat, c.lng]).addTo(map);

            marker.on("click", function () {
                cargadorSeleccionado = c;

                document.getElementById("chargerName").innerText = c.name;
                document.getElementById("chargerType").innerText = c.type;
                document.getElementById("chargerStatus").innerText = c.status;
                document.getElementById("chargerBattery").innerText = c.battery + "%";
                document.getElementById("chargerTime").innerText = c.time + " min";
                document.getElementById("chargerCost").innerText = c.cost + " €";

                document.getElementById("reserveForm").style.display = "none";
                document.getElementById("chargerModal").style.display = "block";
            });
        });

    } catch (error) {
        console.error("Error cargando cargadores:", error);
    }
}

cargarCargadores();

// Cerrar modal
function cerrarModal() {
    document.getElementById("chargerModal").style.display = "none";
    document.getElementById("reserveForm").style.display = "none";

    document.getElementById("reserveDate").value = "";
    document.getElementById("reserveTime").value = "";
}

// Mostrar formulario de reserva
function mostrarFormularioReserva() {
    if (!cargadorSeleccionado) {
        alert("No hay ningún cargador seleccionado");
        return;
    }

    document.getElementById("reserveForm").style.display = "block";
}

// Confirmar reserva
function confirmarReserva() {
    const fecha = document.getElementById("reserveDate").value;
    const hora = document.getElementById("reserveTime").value;

    if (!cargadorSeleccionado) {
        alert("No hay ningún cargador seleccionado");
        return;
    }

    if (!fecha || !hora) {
        alert("Debes seleccionar una fecha y una hora");
        return;
    }

    alert(
        "Reserva confirmada\n\n" +
        "Cargador: " + cargadorSeleccionado.name + "\n" +
        "Fecha: " + fecha + "\n" +
        "Hora: " + hora
    );

    document.getElementById("reserveForm").style.display = "none";
    document.getElementById("chargerModal").style.display = "none";

    document.getElementById("reserveDate").value = "";
    document.getElementById("reserveTime").value = "";
}

// Mantengo esta función por si algún botón antiguo sigue llamando a reservar()
function reservar() {
    mostrarFormularioReserva();
}

// Ir a la página de incidencias
function irAIncidencia() {
    if (!cargadorSeleccionado) {
        alert("No hay ningún cargador seleccionado");
        return;
    }

    localStorage.setItem("chargerName", cargadorSeleccionado.name);
    localStorage.setItem("chargerType", cargadorSeleccionado.type);
    localStorage.setItem("chargerStatus", cargadorSeleccionado.status);
    localStorage.setItem("chargerBattery", cargadorSeleccionado.battery);
    localStorage.setItem("chargerTime", cargadorSeleccionado.time);
    localStorage.setItem("chargerCost", cargadorSeleccionado.cost);

    window.location.href = "incidencia.html";
}

// Cerrar modal si se hace click fuera
window.onclick = function (event) {
    const modal = document.getElementById("chargerModal");

    if (event.target === modal) {
        cerrarModal();
    }
};