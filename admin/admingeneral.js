document.addEventListener("DOMContentLoaded", () => {
  const btnCargadores = document.getElementById("btn-cargadores");
  const btnEstadisticas = document.getElementById("btn-estadisticas");
  const btnLogs = document.getElementById("btn-logs");
  const btnRoles = document.getElementById("btn-roles");

  if (btnCargadores) {
    btnCargadores.addEventListener("click", () => {
      window.location.href = "admincargadores.html";
    });
  }

  if (btnEstadisticas) {
    btnEstadisticas.addEventListener("click", () => {
      window.location.href = "adminestadisticas.html";
    });
  }

  if (btnLogs) {
    btnLogs.addEventListener("click", () => {
      window.location.href = "src/logsl.html";
    });
  }

  if (btnRoles) {
    btnRoles.addEventListener("click", () => {
      window.location.href = "src/rol.html";
    });
  }
});