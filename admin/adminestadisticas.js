const estadisticas = {
    cargasHoy: 52,
    cargasSemana: 310,
    tiempoMedio: "34 minutos",
    cargadorMasUsado: "Cargador B",
    ocupados: 9,
    libres: 11,
    reservasActivas: 18
};

document.getElementById("cargasHoy").textContent = estadisticas.cargasHoy;
document.getElementById("cargasSemana").textContent = estadisticas.cargasSemana;
document.getElementById("tiempoMedio").textContent = estadisticas.tiempoMedio;
document.getElementById("cargadorMasUsado").textContent = estadisticas.cargadorMasUsado;

document.getElementById("estadoCargadores").textContent =
estadisticas.ocupados + " ocupados / " + estadisticas.libres + " libres";

document.getElementById("reservasActivas").textContent = estadisticas.reservasActivas;