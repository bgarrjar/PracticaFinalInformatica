const tabla = document.getElementById("tablaRoles");

const nuevosUsuarios = [
{
nombre: "Ana",
usuario: "ana10",
rol: "Usuario"
},
{
nombre: "Carlos",
usuario: "carlos20",
rol: "Admin"
}
];

nuevosUsuarios.forEach(user => {

let fila = document.createElement("tr");

fila.innerHTML = `
<td>${user.nombre}</td>
<td>${user.usuario}</td>
<td>${user.rol}</td>
`;

tabla.appendChild(fila);

});