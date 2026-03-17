

document.addEventListener('DOMContentLoaded', () => {
    const listaIncidencias = document.getElementById('lista-incidencias');

    // Si el usuario no aportó imagen, no mostramos ninguna (ni "default")
    ocultarImagenesNoProporcionadas(listaIncidencias);
    
    // 1. ALGORITMO DE ORDENACIÓN (FIFO - First In, First Out)
    // Ordena las incidencias de más antigua a más reciente
    ordenarIncidencias(listaIncidencias);

    // 2. GESTIÓN DE ELIMINACIÓN (Botón "Listo")
    // Usamos delegación de eventos para mayor eficiencia
    listaIncidencias.addEventListener('click', (e) => {
        if (e.target.classList.contains('listo-btn')) {
            eliminarIncidencia(e.target);
        }
    });
});

function ocultarImagenesNoProporcionadas(contenedor) {
    if (!contenedor) return;

    const imagenes = contenedor.querySelectorAll('.cargador-imagen img');
    imagenes.forEach((img) => {
        const src = (img.getAttribute('src') || '').trim();

        // Si no hay src, o es una imagen "default" del proyecto, ocultamos el bloque
        const esDefault = /(^|\/)imagenes\/cargador\d+\.jpg$/i.test(src);
        const noHaySrc = !src;

        if (noHaySrc || esDefault) {
            const wrapper = img.closest('.cargador-imagen');
            if (wrapper) wrapper.style.display = 'none';
            return;
        }

        // Si la imagen no carga (ruta rota), también ocultamos
        img.addEventListener('error', () => {
            const wrapper = img.closest('.cargador-imagen');
            if (wrapper) wrapper.style.display = 'none';
        });
    });
}

/**
 * Ordena los nodos del DOM basándose en el atributo data-fecha
 * @param {HTMLElement} contenedor 
 */
function ordenarIncidencias(contenedor) {
    // Convertimos la colección de nodos a un Array para poder usar .sort()
    const incidencias = Array.from(contenedor.querySelectorAll('.incidencia'));

    incidencias.sort((a, b) => {
        const fechaA = obtenerFechaIncidencia(a);
        const fechaB = obtenerFechaIncidencia(b);
        // Orden ascendente: más antiguos primero
        return fechaA - fechaB;
    });

    // Volvemos a añadir los elementos ordenados al contenedor
    // El método appendChild mueve el elemento si ya existe en el DOM
    incidencias.forEach(incidencia => contenedor.appendChild(incidencia));
}

function obtenerFechaIncidencia(incidenciaEl) {
    // Priorizamos la fecha visible ("Fecha del reporte") porque es la que ve el usuario.
    // Si no existe o es inválida, caemos a data-fecha.
    const texto = incidenciaEl.textContent || '';
    const match = texto.match(/Fecha\s+del\s+reporte:\s*(\d{2}\/\d{2}\/\d{4})/i);
    const fechaDesdeTexto = parseFechaFlexible(match?.[1] || '');
    if (!Number.isNaN(fechaDesdeTexto)) return fechaDesdeTexto;

    const raw = (incidenciaEl.dataset.fecha || '').trim();
    const fechaDesdeData = parseFechaFlexible(raw);
    if (!Number.isNaN(fechaDesdeData)) return fechaDesdeData;

    // Si no hay fecha válida, la mandamos al final
    return Number.POSITIVE_INFINITY;
}

function parseFechaFlexible(valor) {
    if (!valor) return Number.NaN;

    // ISO: 2026-03-06 (o ISO con hora)
    if (/^\d{4}-\d{2}-\d{2}/.test(valor)) {
        const d = new Date(valor.includes('T') ? valor : `${valor}T00:00:00`);
        return Number.isNaN(d.getTime()) ? Number.NaN : d.getTime();
    }

    // Español: dd/mm/yyyy
    const m = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) {
        const [, dd, mm, yyyy] = m;
        const d = new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
        return Number.isNaN(d.getTime()) ? Number.NaN : d.getTime();
    }

    const d = new Date(valor);
    return Number.isNaN(d.getTime()) ? Number.NaN : d.getTime();
}

/**
 * Elimina el elemento de la incidencia con un efecto visual simple
 * @param {HTMLElement} boton 
 */
function eliminarIncidencia(boton) {
    // Buscamos el ancestro más cercano con la clase 'incidencia'
    const elementoIncidencia = boton.closest('.incidencia');
    
    if (confirm('¿Confirmas que el cargador ha sido reparado?')) {
        // Añadimos una pequeña transición o eliminamos directamente
        elementoIncidencia.style.opacity = '0';
        setTimeout(() => {
            elementoIncidencia.remove();
            
            verificarListaVacia();
        }, 300);
    }
}

function verificarListaVacia() {
    const lista = document.getElementById('lista-incidencias');
    if (lista.children.length === 0) {
        lista.innerHTML = '<p class="mensaje-vacio">No hay incidencias pendientes. ¡Buen trabajo!</p>';
    }
}