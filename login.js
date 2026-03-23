document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    try {
        // RF-07: Enviamos los datos al servidor para validar el Rol [cite: 21, 37]
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Guardamos los datos reales del JSON en el navegador [cite: 41]
            localStorage.setItem("nombre", data.usuario.nombre);
            localStorage.setItem("email", data.usuario.email);
            localStorage.setItem("rol", data.usuario.rol);

            // Redirigir según el sistema de roles del PDF 
            const rol = data.usuario.rol;
            
            if (rol === "usuario") {
                window.location.href = "usuario.html";
            } else if (rol === "tecnico") {
                window.location.href = "tecnico/tecnico.html";
            } else if (rol === "admin") {
                window.location.href = "admin/admingeneral.html";
            }
        } else {
            // RNF-04: Mensaje de error claro para el usuario [cite: 29]
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
        alert("No se pudo conectar con el servidor.");
    }
});