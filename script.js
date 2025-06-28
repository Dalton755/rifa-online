const grid = document.getElementById("numbersGrid");
const infoBox = document.getElementById("infoBox");

for (let i = 1; i <= 100; i++) {
  const numDiv = document.createElement("div");
  numDiv.classList.add("number");
  numDiv.textContent = i;

  numDiv.addEventListener("click", () => {
    const name = prompt("Digite seu nome:");
    if (name) {
      numDiv.classList.add("selected");
      numDiv.textContent = `${i} 🎉`;
      infoBox.innerHTML = `Obrigado, <strong>${name}</strong>! Você escolheu o número <strong>${i}</strong>. Faça o PIX para <strong>sua-chave@pix.com</strong>`;
    }
  });

  grid.appendChild(numDiv);
}
