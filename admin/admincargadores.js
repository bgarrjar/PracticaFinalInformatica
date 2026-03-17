const formulario = document.querySelector("form");
const tabla = document.querySelector("tbody");

formulario.addEventListener("submit", function(event) {

event.preventDefault();

// Obtener valores
const nombre = document.getElementById("nombre").value;
const tipo = document.getElementById("tipo").value;
const estado = document.getElementById("estado").value;
const ubicacion = document.getElementById("ubicacion").value;

// Generar ID automático
const id = document.querySelectorAll("tbody tr").length + 1;

// Crear fila
const nuevaFila = document.createElement("tr");

nuevaFila.innerHTML = `
<td>${id}</td>
<td>${nombre}</td>
<td>${tipo}</td>
<td>${estado}</td>
<td>${ubicacion}</td>
<td>
<button class="ver">Ver</button>
<button class="editar">Editar</button>
<button class="eliminar">Eliminar</button>
</td>
`;

// Añadir fila
tabla.appendChild(nuevaFila);

// Limpiar formulario
formulario.reset();

});


// BOTÓN ELIMINAR
tabla.addEventListener("click", function(event){

if(event.target.classList.contains("eliminar")){
event.target.closest("tr").remove();
}

});


// BOTÓN EDITAR (versión sencilla)
tabla.addEventListener("click", function(event){

if(event.target.classList.contains("editar")){

const fila = event.target.closest("tr");

const nombre = prompt("Nuevo nombre:", fila.children[1].textContent);
const tipo = prompt("Nuevo tipo:", fila.children[2].textContent);
const estado = prompt("Nuevo estado:", fila.children[3].textContent);
const ubicacion = prompt("Nueva ubicación:", fila.children[4].textContent);

if(nombre) fila.children[1].textContent = nombre;
if(tipo) fila.children[2].textContent = tipo;
if(estado) fila.children[3].textContent = estado;
if(ubicacion) fila.children[4].textContent = ubicacion;

}

});


// BOTÓN VER
tabla.addEventListener("click", function(event){

if(event.target.classList.contains("ver")){

const fila = event.target.closest("tr");

const ubicacion = fila.children[4].textContent;

window.open("https://www.google.com/maps/search/" + ubicacion);

}

});