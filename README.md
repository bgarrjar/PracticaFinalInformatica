# PracticaFinalInformatica
en usuariohtml:
El Formulario de Reserva (RF-05)

En tu HTML tienes un div llamado reserveForm, pero le falta un botón para cerrar o cancelar si el usuario se arrepiente. Además, para que la Persona D pueda programar la lógica, necesitas que los inputs tengan IDs claros.

Una nota importante para la Persona D (Lógica)

Tu función confirmarReserva() ahora mismo solo lanza un alert. Para cumplir con el RF-05 y el Ítem 10 (Almacenamiento), la Persona D tendrá que añadir un fetch dentro de esa función para enviar la reserva a tu archivo reservas.json.

Esto es solo si queremos que se vean distintos los cragadores 

cargadores.forEach(c => {
    // Si está en reparación, podemos cambiar el color o la opacidad
    let opcionesMarker = {};
    if (c.status === "en reparación") {
        // Podrías usar un icono rojo aquí
    }
    const marker = L.marker([c.lat, c.lng], opcionesMarker).addTo(map);
    // ... resto del código
});

Muy importante añadir el filtro, se puede hacer en cualquier momento



Si el “historial de verdad” debe salir de data/reservas.json, entonces no lo puede garantizar solo tu trabajo como Persona A: todavía falta que alguien (Persona D, y luego Persona C) consuma ese JSON y lo pinte.

Lo que sí puedes garantizar tú (Persona A) es que el JSON tenga todo lo necesario y en un modelo coherente con el resto. En tu caso ya tienes:

En data/reservas.json: id_reserva, id_usuario, id_cargador, fecha, hora, estado_reserva y tiempo_limite_minutos (1h).
En data/cargadores.json: id (C01, C04...), name, type, status, etc.
Y ahora el “puente” es este mapeo (esto es lo importante que le tienes que decir a Persona D):

reservas.js actual (ficticio) espera campos: id, estado, fecha, cargador
Pero tu JSON trae: id_reserva, estado_reserva, fecha + hora, id_cargador
Por tanto cuando integren “historial de verdad”, deben hacer:
id = id_reserva
estado (para mostrar y para el botón “Cancelar”) = estado_reserva (y ajustar mayúsculas si hace falta)
fecha y hora = ${fecha} ${hora}
cargador (nombre) = buscar en cargadores.json el name usando id_cargador
Conclusión: como Persona A no tienes que tocar reservas.js/reservas.html todavía. Solo tienes que dejar el modelo de datos listo (ya lo hiciste) y pasarle a Persona D este mapeo para que al llegar a su fase el historial se “alimente” del JSON real.


QUE ES LO QUE TIENE QUE HACER EL RESTO( RECOMENDACIÓN)
Persona B / DevOps (servidor + rutas): crear API REST que lea/escriba tus /data:
endpoints para cargar/cargar filtro de cargadores
endpoints para listar/crear/cancelar reservas
endpoint para registrar incidencia (normalmente añade a cargadores.json dentro de incidencias)
Persona D / Logic Developer: reemplazar los “datos ficticios / manipulación de DOM” por llamadas reales a API:
admin/admincargadores.js: que la tabla se rellene con cargadores desde API y que “editar/eliminar/añadir” hagan fetch al backend
tecnico/tecnico.js: que el formulario y la tabla trabajen con cargadores reales (y al actualizar estado, también actualicen/incorporen incidencias)
incidencias.js: que deje de “simular” y haga fetch para enviar la incidencia al backend
admin/adminestadisticas.js: que deje de usar estadisticas = { ... } hardcodeado y obtenga métricas desde API
Persona C / Security Lead: añadir validaciones de rol antes de acciones de admin/técnico (usando data/usuarios.json) para que:
solo admin gestione cargadores y stats/logs
solo tecnico actualice estado/incidencias
Resumen corto
Tú debes dejar el modelo de datos coherente en /data (ya vas con tiempo_limite_minutos: 60). Los .js de admin, tecnico e incidencias deben conectarse a la API para que el historial y el resto usen “la verdad” de tus JSON.

Si me confirmas si el backend que vais a hacer guardará las incidencias como cargadores[].incidencias[] (como ya está en tu cargadores.json), te digo exactamente cómo debe “encajar” incidencias.js con ese campo.
 --Ejemplo de backend en incidencias
 Qué debe hacer el resto cuando tú hayas acabado
Persona D / Backend (guardar “incidencia de verdad”)
Cuando alguien envía el formulario (incidencias.js), el backend tiene que:

Identificar el cargador por cargador (en tu HTML es un input que probablemente será C01, C04, etc.).
Añadir una nueva entrada en cargadores.json en cargador.incidencias.
Persistir el cambio y devolver la lista/estado actualizado.
Persona D / Front (incidencias.js, vista técnico)
incidencias.js ahora mismo “simula” con console.log. Cuando lo conecten, debe hacer un fetch/POST al backend.
La vista de técnico (tecnico/tecnico.js + tecnico.html) tiene que mostrar esas incidencias leyendo cargadores[].incidencias.

