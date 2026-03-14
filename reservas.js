// Obtener el usuario que inició sesión
const usuario = localStorage.getItem("usuario");

// Mostrar usuario en la página
const usuarioTexto = document.querySelector("p");
usuarioTexto.textContent = "Usuario: " + usuario;


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

    fila.innerHTML = `
        <td>${reserva.id}</td>
        <td>${reserva.estado}</td>
        <td>${reserva.fecha}</td>
        <td>${reserva.cargador}</td>
        <td>
            ${reserva.estado === "Activa" ? "<button>Cancelar</button>" : "-"}
        </td>
    `;

    tabla.appendChild(fila);

});