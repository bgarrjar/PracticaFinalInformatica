const tabla = document.getElementById("tablaLogs");

const nuevosLogs = [
{
fecha: "01/03/2026",
usuario: "juan",
accion: "Prestó cargador"
},
{
fecha: "03/03/2026",
usuario: "ana",
accion: "Registró cargador"
}
];

nuevosLogs.forEach(log => {

let fila = document.createElement("tr");

fila.innerHTML = `
<td>${log.fecha}</td>
<td>${log.usuario}</td>
<td>${log.accion}</td>
`;

tabla.appendChild(fila);

});