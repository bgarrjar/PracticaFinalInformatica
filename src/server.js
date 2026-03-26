const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});


//login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const ruta = path.join(__dirname, "../data/usuarios.json");

    fs.readFile(ruta, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error leyendo usuarios");
        }

        const usuarios = JSON.parse(data);

        const usuario = usuarios.find(
            u => u.email === email && u.password === password
        );

        if (!usuario) {
            return res.status(401).send("Credenciales incorrectas");
        }

        res.json(usuario);
    });
});


//usuarios
app.get("/usuarios", (req, res) => {
    const ruta = path.join(__dirname, "../data/usuarios.json");

    fs.readFile(ruta, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error leyendo usuarios");
        }
        res.json(JSON.parse(data));
    });
});


//cargadores
app.get("/cargadores", (req, res) => {
    const ruta = path.join(__dirname, "../data/cargadores.json");

    fs.readFile(ruta, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error leyendo cargadores");
        }
        res.json(JSON.parse(data));
    });
});


//reservas
app.get("/reservas", (req, res) => {
    const ruta = path.join(__dirname, "../data/reservas.json");

    fs.readFile(ruta, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error leyendo reservas");
        }
        res.json(JSON.parse(data));
    });
});


//incidencias
app.post("/incidencias", (req, res) => {
    const nuevaIncidencia = req.body;

    const ruta = path.join(__dirname, "../data/cargadores.json");

    fs.readFile(ruta, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error leyendo cargadores");
        }

        let cargadores = JSON.parse(data);

        const cargador = cargadores.find(c => c.id == nuevaIncidencia.cargadorId);

        if (!cargador) {
            return res.status(404).send("Cargador no encontrado");
        }

        if (!cargador.incidencias) {
            cargador.incidencias = [];
        }

        cargador.incidencias.push(nuevaIncidencia);

        fs.writeFile(ruta, JSON.stringify(cargadores, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error guardando incidencia");
            }

            res.send("Incidencia guardada correctamente");
        });
    });
});


//arrancar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});