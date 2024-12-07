const formBusca = document.getElementById("form-artigos");

formBusca.addEventListener("submit", function (event) {
  event.preventDefault();
  clearInfo();

  const formData = new FormData(formBusca);
  const pesquisa = formData.get("pesquisa");
  mostrarArtigos(pesquisa);
});

async function buscarArtigos(pesquisa) {
  try {
    const response = await fetch(`../artigos?pesquisa=${pesquisa}`, {
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

async function mostrarArtigos(pesquisa) {
  const artigos = await buscarArtigos(pesquisa);
  const divArtigos = document.getElementById("div-artigos");

  artigos.forEach((artigo) => {
    const novaDiv = document.createElement("div");
    const titulo = document.createElement("h3");
    const linkEncontrado = document.createElement("a");
    const link = document.createElement("a");

    titulo.textContent = artigo.titulo;
    novaDiv.appendChild(titulo);

    linkEncontrado.href = artigo.linkEncontrado;
    const textoPreLinkEncontrado = document.createTextNode("Encontrado em: ");
    novaDiv.appendChild(textoPreLinkEncontrado);
    linkEncontrado.textContent = artigo.linkEncontrado;
    novaDiv.appendChild(linkEncontrado);
    novaDiv.appendChild(document.createElement("br"));

    link.href = artigo.link;
    const textoPreLink = document.createTextNode("Leia mais: ");
    novaDiv.appendChild(textoPreLink);
    link.textContent = artigo.link;
    novaDiv.appendChild(link);

    divArtigos.appendChild(novaDiv);
  });
}

function clearInfo() {
  const divArtigos = document.getElementById("div-artigos");
  divArtigos.innerHTML = "";
}
