var numberStars = 5;

async function loadData() {
  let listaEmpresas = document.getElementById("lista-empresas");
  listaEmpresas.classList.add("form-group");
  const result = await buscarParceiros();
  const empresas = result.data;

  empresas.forEach((empresa) => {
    let divImage = document.createElement("div");
    divImage.classList.add("tamanho-img");
    let img = document.createElement("img");
    img.src = empresa.foto;
    divImage.style.background = img;

    divImage.addEventListener("mouseover", function () {
      if (!divImage.querySelector("button")) {
        var button = document.createElement("button");
        button.textContent = "Veja outras avaliações";
        button.classList.add("btn", "btn-primary");
        button.type = "button";
        button.addEventListener("click", function () {
          window.location.href =
            "/pages/avaliacao-empresa.html?id=" + empresa.id;
        });
        divImage.appendChild(button);
      }
    });

    divImage.addEventListener("mouseout", function (event) {
      var button = divImage.querySelector("button");
      if (button && !button.contains(event.relatedTarget)) {
        divImage.removeChild(button);
      }
    });

    img.classList.add("foto-empresa");
    let nomeDaEmpresa = empresa.nome;
    let h2 = document.createElement("h2");
    h2.innerHTML = nomeDaEmpresa;
    h2.classList.add("nome-empresa");
    let form = document.createElement("form");
    form.appendChild(h2);
    form.classList.add("avaliation-form");

    let li = document.createElement("li");
    form.appendChild(divImage);
    divImage.appendChild(img);
    let input = document.createElement("input");
    input.name = "textoAvaliacao";
    input.type = "text";
    input.classList.add("texto-avaliacao");
    input.classList.add("form-control");
    input.placeholder = "Escreva sua opinião";

    let avaliacao = document.createElement("ul");
    avaliacao.classList.add("avaliacao");
    form.appendChild(avaliacao);
    form.appendChild(input);

    listaEmpresas.appendChild(li);
    for (var i = 1; i <= 5; i++) {
      var liStar = document.createElement("li");
      liStar.className = "star-icon";
      liStar.dataset.avaliacao = i;
      avaliacao.appendChild(liStar);
    }

    let button = document.createElement("button");
    button.type = "submit";
    button.classList.add("btn");
    button.classList.add("enviar");
    button.textContent = "Enviar avaliação";
    form.appendChild(button);
    li.appendChild(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      avaliar(form, empresa.id);
    });

    avaliacao.addEventListener("click", function (event) {
      event.preventDefault();
      verificarNumeroStars(event);
    });
  });
}

var stars = document.getElementsByClassName("star-icon");

function avaliar(form, EmpresaID) {
  let formData = new FormData(form);
  formData.append("numberStars", numberStars);
  formData.append("EmpresaID", EmpresaID);
  let formDataJson = JSON.stringify(Object.fromEntries(formData));
  fetch("../avaliacoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJson,
  })
    .then((response) => response.text())
    .then((message) => {
      alert(message);
      const input = form.querySelector('input[name="textoAvaliacao"]');
      input.value = "";
    })
    .catch((error) => {
      console.error(error);
    });
}
async function buscarParceiros() {
  try {
    const response = await fetch("../parceiros", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function verificarNumeroStars(e) {
  var classStar = e.target.classList;
  if (!classStar.contains("ativo")) {
    Array.from(stars).forEach((star) => {
      star.classList.remove("ativo");
    });
    classStar.add("ativo");
    numberStars = e.target.getAttribute("data-avaliacao");
  }
}

function login() {
  window.location.href = "../../pages/login.html";
}

function logout() {
  fetch("logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "/";
        alert("Logout realizado com sucesso!");
      }
    });
}
