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

  iniciarContadorRegressivo();
}

function iniciarContadorRegressivo() {
  if (intervaloContador) clearInterval(intervaloContador);

  const horas = Math.floor(Math.random() * 120) + 1;
  const totalSegundos = horas * 3600;
  let restante = totalSegundos;

  const texto = document.getElementById("restantes");
  const barra = document.getElementById("barraProgresso");

  intervaloContador = setInterval(() => {
    const h = Math.floor(restante / 3600);
    const m = Math.floor((restante % 3600) / 60);
    const s = restante % 60;

    texto.innerText = `Possui: ${String(h).padStart(2, "0")}:${String(
      m
    ).padStart(2, "0")}:${String(s).padStart(2, "0")} horas restantes.`;

    const porcentagem = (restante / totalSegundos) * 100;
    barra.style.width = `${porcentagem}%`;

    if (porcentagem < 40) {
      barra.classList.add("danger");
      barra.classList.remove("warning");
    } else if (porcentagem < 70) {
      barra.classList.add("warning");
      barra.classList.remove("danger");
    } else {
      barra.classList.remove("warning", "danger");
    }

    restante--;

    if (restante < 0) {
      clearInterval(intervaloContador);
      texto.innerText = "00:00:00";
      barra.style.width = "0%";
    }
  }, 1000);
}

document
  .getElementById("btnCalcular")
  ?.addEventListener("click", iniciarContador);
