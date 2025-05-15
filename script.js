function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

const departamentosMunicipios = {
  "Cundinamarca": ["Bogotá", "Soacha", "Chía", "Facatativá", "Zipaquirá"],
  "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Rionegro"],
  "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Sabanalarga"],
  "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"]
};

const form = document.getElementById("formulario");
const departamentoInput = document.getElementById("departamento");
const municipioInput = document.getElementById("municipio");
const municipioDatalist = document.getElementById("municipios");

departamentoInput.addEventListener("input", function () {
  const selectedDept = departamentoInput.value.trim();
  const municipios = departamentosMunicipios[selectedDept] || [];
  municipioDatalist.innerHTML = "";
  municipios.forEach((muni) => {
    const option = document.createElement("option");
    option.value = muni;
    municipioDatalist.appendChild(option);
  });
  municipioInput.value = "";
  municipioInput.placeholder = municipios.length ? "Ej. " + municipios[0] : "No hay municipios disponibles";
});

form.addEventListener("submit", function (e) {
  const selectedDept = departamentoInput.value.trim();
  const selectedMuni = municipioInput.value.trim();
  const validDepartamentos = Object.keys(departamentosMunicipios).map((d) => d.toLowerCase());
  const validMunicipios = (departamentosMunicipios[selectedDept] || []).map((m) => m.toLowerCase());

  if (!validDepartamentos.includes(selectedDept.toLowerCase())) {
    alert("Por favor selecciona un departamento válido de la lista.");
    departamentoInput.focus();
    e.preventDefault();
    return;
  }

  if (!validMunicipios.includes(selectedMuni.toLowerCase())) {
    alert("Por favor selecciona un municipio válido correspondiente al departamento.");
    municipioInput.focus();
    e.preventDefault();
    return;
  }
});

const scriptURL = "https://script.google.com/macros/s/AKfycbzUOHeCJo68Ekhq2ne6CWPw1k6_L6eHrTuJAxRhVZxp_gwoOO383gDvCIKhzazhgH7f2g/exec";
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Gracias por tu respuesta";
      setTimeout(() => (msg.innerHTML = ""), 5000);
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      msg.innerHTML = "Hubo un error al enviar el formulario";
    });
});
