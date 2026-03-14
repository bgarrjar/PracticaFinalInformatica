// Obtener usuario que inició sesión
const usuario = localStorage.getItem("usuario");

// Obtener el formulario
const formulario = document.querySelector("form");

// Obtener campo de fecha
const campoFecha = document.getElementById("fecha");


// Poner automáticamente la fecha y hora actual
const ahora = new Date();
const fechaFormato = ahora.toISOString().slice(0,16);
campoFecha.value = fechaFormato;


// Detectar envío del formulario
formulario.addEventListener("submit", function(event) {

    // Evitar que la página se recargue
    event.preventDefault();

    // Obtener valores del formulario
    const cargador = document.getElementById("cargador").value;
    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value;
    const foto = document.getElementById("foto").files[0];

    // Crear objeto incidencia (simulación de envío)
    const incidencia = {
        usuario: usuario,
        cargador: cargador,
        fecha: fecha,
        descripcion: descripcion,
        foto: foto ? foto.name : "Sin foto"
    };

    // Mostrar en consola (simulación de envío a servidor)
    console.log("Incidencia enviada:", incidencia);

    // Mensaje al usuario
    alert("Incidencia enviada correctamente");

    // Limpiar formulario
    formulario.reset();

});