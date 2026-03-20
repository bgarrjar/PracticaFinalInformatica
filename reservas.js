// Obtener el usuario que inició sesión
const usuario = localStorage.getItem("usuario");

// Mostrar usuario en la página
const usuarioTexto = document.querySelector("p");
usuarioTexto.textContent = "Usuario: " + usuario;


// BOTÓN VOLVER AL MAPA
const btnMapa = document.getElementById("btnMapa");

if (btnMapa) {
    btnMapa.addEventListener("click", function() {
        window.location.href = "usuario.html";
    });
}


// Datos ficticios de reservas
const reservas = [
    {
        id: 1,
        estado: "Activa",
        fecha: "2026-03-20 18:00",
        cargador: "Centro"
    },
    {
        id: 2,
        estado: "Finalizada",
        fecha: "2026-03-18 12:00",
        cargador: "Norte"
    }
];


// Obtener la tabla
const tabla = document.querySelector("table");


// Añadir reservas a la tabla
reservas.forEach(function(reserva) {

    const fila = document.createElement("tr");

    // Crear columnas
    const tdId = document.createElement("td");
    tdId.textContent = reserva.id;

    const tdEstado = document.createElement("td");
    tdEstado.textContent = reserva.estado;

    const tdFecha = document.createElement("td");
    tdFecha.textContent = reserva.fecha;

    const tdCargador = document.createElement("td");
    tdCargador.textContent = reserva.cargador;

    const tdAccion = document.createElement("td");

    // Si la reserva está activa → botón cancelar
    if (reserva.estado === "Activa") {

        const btnCancelar = document.createElement("button");
        btnCancelar.textContent = "Cancelar";

        // Evento click para cancelar
        btnCancelar.addEventListener("click", function() {
            if (confirm("¿Seguro que quieres cancelar la reserva?")) {
                fila.remove();
            }
        });

        tdAccion.appendChild(btnCancelar);

    } else {
        tdAccion.textContent = "-";
    }

    // Añadir columnas a la fila
    fila.appendChild(tdId);
    fila.appendChild(tdEstado);
    fila.appendChild(tdFecha);
    fila.appendChild(tdCargador);
    fila.appendChild(tdAccion);

    // Añadir fila a la tabla
    tabla.appendChild(fila);

});