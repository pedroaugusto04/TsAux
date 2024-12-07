async function buscar() {
  const result = await buscarAvaliacoes();
  const avaliacoes = result.avaliacoes;
  let listaEmpresas = document.getElementById("lista-empresas");
  listaEmpresas.classList.add("form-group");
  let empresa = result.empresa;

  avaliacoes.forEach((avaliacao) => {
    let divImage = document.createElement("div");
    divImage.classList.add("tamanho-img-noblur");
    let img = document.createElement("img");
    img.src = empresa.foto;
    divImage.style.background = img;
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

    let span = document.createElement("span");
    span.name = "textoAvaliacao";
    span.classList.add("texto-avaliacao");
    span.classList.add("form-control");
    span.textContent = avaliacao.description;

    let avaliacaoStars = document.createElement("ul");
    avaliacaoStars.classList.add("avaliacao");
    form.appendChild(avaliacaoStars);

    form.appendChild(span);

    listaEmpresas.appendChild(li);

    for (var i = 1; i <= avaliacao.stars; i++) {
      var liStar = document.createElement("li");
      liStar.className = "star-icon-nohover";
      liStar.dataset.avaliacao = i;
      avaliacaoStars.appendChild(liStar);
    }

    li.appendChild(form);
  });
}

async function buscarAvaliacoes() {
  let url = new URL(window.location.href);
  let id = url.searchParams.get("id");
  url = url.pathname.replace(".html", "/") + id;
  try {
    const response = await fetch(url, {
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
