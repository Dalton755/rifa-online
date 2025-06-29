const API_URL = "https://script.google.com/macros/s/AKfycby_5F1Q0K5Lgks1NpSiqNQIqeOQ4tB-xvK_00QoE18n8PxWcj74Ut76D2kOrQp3Kx6Scw/exec";

const grid = document.getElementById("numbersGrid");
const infoBox = document.getElementById("infoBox");

let reservas = [];

function carregarReservas() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      reservas = data.map(entry => parseInt(entry[0]));
      montarGrid();
    });
}

function montarGrid() {
  grid.innerHTML = "";
  for (let i = 1; i <= 250; i++) {
    const numDiv = document.createElement("div");
    numDiv.classList.add("number");

    if (reservas.includes(i)) {
      numDiv.classList.add("selected");
      numDiv.textContent = `${i} 🎉`;
    } else {
      numDiv.textContent = i;
      numDiv.addEventListener("click", () => reservarNumero(i));
    }

    grid.appendChild(numDiv);
  }
}

function reservarNumero(numero) {
  const nome = prompt("Digite seu nome:");
  if (!nome) return;
  const telefone = prompt("Digite seu telefone:");
  if (!telefone) return;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ numero, nome, telefone }),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.text())
    .then(response => {
      if (response === "reservado") {
        alert("❌ Esse número já foi reservado.");
      } else {
        alert("✅ Número reservado com sucesso!");
        carregarReservas();
      }
    });
}

document.getElementById("drawButton").addEventListener("click", () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        alert("Nenhum número foi reservado ainda.");
        return;
      }
      const random = Math.floor(Math.random() * data.length);
      const [numero, nome, telefone] = data[random];
      alert(`🎉 Número sorteado: ${numero}\n👤 Nome: ${nome}\n📱 Telefone: ${telefone}`);
    });
});

carregarReservas();
