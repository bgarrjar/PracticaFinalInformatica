// Esperar a que el formulario se envíe
document.querySelector("form").addEventListener("submit", function(event) {

    // Evita que la página se recargue
    event.preventDefault();

    // Obtener los valores del formulario
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    // Usuarios de prueba (simulación de base de datos)
    const usuarios = {
        "usuario@test.com": "usuario",
        "tecnico@test.com": "tecnico",
        "admin@test.com": "admin"
    };

    // Comprobar si el usuario existe
    if (usuarios[usuario]) {

        const rol = usuarios[usuario];

        // Guardar usuario en el navegador (para usarlo luego)
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("rol", rol);

        // Redirigir según el rol
        if (rol === "usuario") {
            window.location.href = "usuario.html";
        }

        else if (rol === "tecnico") {
            window.location.href = "tecnico/tecnico.html";
        }

        else if (rol === "admin") {
            window.location.href = "admin/admingeneral.html";
        }

    } else {
        alert("Usuario no reconocido");
    }

});