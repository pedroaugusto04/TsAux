async function buscar() {
  const solicitacoes = await buscarSolicitacoes();
  const container = document.getElementById("container");

  solicitacoes.forEach((solicitacao) => {
    const form = document.createElement("form");
    const divSolicitacao = document.createElement("div");
    const divImage = document.createElement("div");
    const img = document.createElement("img");
    const idSolicitacao = solicitacao.id;
    divSolicitacao.textContent = solicitacao.nome;
    divSolicitacao.classList.add("EmpresaAdm");
    form.classList.add("formularioADM")
    img.src = solicitacao.foto;
    divImage.appendChild(img);

    const inputNome = document.createElement("input");
    inputNome.type = "hidden";
    inputNome.name = "nome";
    inputNome.value = solicitacao.nome;

    const inputFoto = document.createElement("input");
    inputFoto.type = "hidden";
    inputFoto.name = "foto";
    inputFoto.value = solicitacao.foto;

    form.appendChild(divSolicitacao);
    form.appendChild(divImage);
    form.appendChild(inputNome);
    form.appendChild(inputFoto);
    form.appendChild(document.createElement("br"));

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.type = "button";
    botaoConfirmar.textContent = "Confirmar";
    botaoConfirmar.classList.add("btn2");
    botaoConfirmar.addEventListener("click", () => {
      confirmarSolicitacao(form,idSolicitacao);
    });
    form.appendChild(botaoConfirmar);

    const botaoNegar = document.createElement("button");
    botaoNegar.type = "button";
    botaoNegar.textContent = "Negar";
    botaoNegar.classList.add("btn1");
    botaoNegar.addEventListener("click", () => {
      negarSolicitacao(idSolicitacao);
    });
    form.appendChild(botaoNegar);

    container.appendChild(form);
  });
}

async function buscarSolicitacoes() {
  try {
    const response = await fetch("../admin", {
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

async function confirmarSolicitacao(form,idSolicitacao) {
  let formData = new FormData(form);
  formData.append('id', idSolicitacao);
  let formDataJson = JSON.stringify(Object.fromEntries(formData));
  try {
    const response = await fetch("../admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJson,
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function negarSolicitacao(id) {
  try {
    const response = await fetch(`../admin/${id}`, {
      method: "DELETE",
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
