let intervaloContador;

function calcularDiasVividos(dataNascimento) {
  const hoje = new Date();
  const diff = hoje - dataNascimento;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function iniciarContador() {
  const input = document.getElementById("dataNascimento");
  const paragrafo = document.querySelector(".contador");

  if (!input.value) {
    paragrafo.textContent = "Por favor, selecione uma data.";
    return;
  }

  const nascimento = new Date(input.value);
  const diasVividos = calcularDiasVividos(nascimento);
  paragrafo.textContent = `Você está vivo há ${diasVividos} dias!`;

  const horas = Math.floor(Math.random() * 120) + 1;
  const totalSegundos = horas * 3600;
  const agora = Date.now();


  localStorage.setItem("dataNascimento", input.value);
  localStorage.setItem("inicioContador", agora);
  localStorage.setItem("totalSegundos", totalSegundos);
  localStorage.setItem("diasVividos", diasVividos);

  iniciarContadorRegressivo(agora, totalSegundos);
}

function iniciarContadorRegressivo(inicio, totalSegundos) {
  if (intervaloContador) clearInterval(intervaloContador);

  const elemento = document.getElementById("restantes");
  const barra = document.getElementById("barraProgresso");

  intervaloContador = setInterval(() => {
    const agora = Date.now();
    const decorrido = Math.floor((agora - inicio) / 1000);
    const restante = totalSegundos - decorrido;

    if (restante <= 0) {
      clearInterval(intervaloContador);
      elemento.innerText = "00:00:00";
      barra.style.width = "0%";
      return;
    }

    const h = Math.floor(restante / 3600);
    const m = Math.floor((restante % 3600) / 60);
    const s = restante % 60;

    elemento.innerText = `Possui: ${String(h).padStart(2, "0")}:${String(
      m
    ).padStart(2, "0")}:${String(s).padStart(2, "0")} horas restantes.`;

    const porcentagem = (restante / totalSegundos) * 100;
    barra.style.width = `${porcentagem}%`;

    barra.classList.remove("danger", "warning");
    if (porcentagem < 40) barra.classList.add("danger");
    else if (porcentagem < 70) barra.classList.add("warning");
  }, 1000);
}

function carregarContadorSalvo() {
  const inicio = localStorage.getItem("inicioContador");
  const total = localStorage.getItem("totalSegundos");
  const dias = localStorage.getItem("diasVividos");
  const dataNascimentoSalva = localStorage.getItem("dataNascimento");

  if (dataNascimentoSalva) {
    document.getElementById("dataNascimento").value = dataNascimentoSalva;
  }

  if (dias) {
    document.querySelector(
      ".contador"
    ).textContent = `Você está vivo há ${dias} dias!`;
  }

  if (inicio && total) {
    iniciarContadorRegressivo(Number(inicio), Number(total));
  }
}

function resetarContador() {
  localStorage.clear();
  clearInterval(intervaloContador);

  document.querySelector(".contador").textContent = "";
  document.getElementById("restantes").textContent = "";
  document.getElementById("barraProgresso").style.width = "100%";
  document
    .getElementById("barraProgresso")
    .classList.remove("warning", "danger");
  document.getElementById("dataNascimento").value = "";
}

document
  .getElementById("btnCalcular")
  ?.addEventListener("click", iniciarContador);
document
  .getElementById("btnResetar")
  ?.addEventListener("click", resetarContador);

carregarContadorSalvo();
