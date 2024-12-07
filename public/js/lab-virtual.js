
const appliedEPIs = new Set();
let personagemSelecionado = null;
let personagemGenero = null;

function selecaoPersonagem(personagem) {
    document.querySelectorAll('.personagem').forEach(card => {
        card.classList.remove('selecionado');
    });

    document.getElementById(`personagem${personagem}`).classList.add('selecionado');
    personagemSelecionado = personagem;
    personagemGenero = personagem === 'M' ? 'masculino' : 'feminino';
    document.getElementById('btn-start').classList.remove("invisible");
}

function iniciarJogo() {
    document.getElementById('btn-start').classList.add("invisible");
    document.getElementById('seletor-personagem').classList.add("invisible");
    const personagem = document.getElementById('personagem');
    personagem.src = `../images/lab-virtual/personagens/${personagemGenero}/personagem.png`;
    document.getElementById('fase-epi').classList.remove("invisible");
}

function salvarSelecao() {
    console.log(personagemSelecionado);
    iniciarJogo();
}

document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("epi")) {
        e.target.classList.add("dragging");
    }
});

document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("epi")) {
        e.target.classList.remove("dragging");
    }
});

const personagem = document.getElementById("personagem");


personagem.addEventListener("dragover", (e) => {
    e.preventDefault();
});

personagem.addEventListener("drop", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (dragging && dragging.classList.contains("epi")) {
        const epiId = dragging.id;
        appliedEPIs.add(epiId);
        updatePersonagemImage();
        dragging.remove();
    }
});

function updatePersonagemImage() {
    const epiCombination = Array.from(appliedEPIs).sort().join('_');
    personagem.src = `../images/lab-virtual/personagens/${personagemGenero}/personagem_${epiCombination}.png`;
    document.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("ferramenta") && e.target.getAttribute("draggable") === "true") {
            e.target.classList.add("dragging");
        }
    });
}
document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("ferramenta") && e.target.getAttribute("draggable") === "true") {
        e.target.classList.add("dragging");
    }
});

document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("ferramenta")) {
        e.target.classList.remove("dragging");
    }
});

const placaMae = document.getElementById("placa-mae");
const tesouraMecanica = document.getElementById("tesoura-mecanica");

placaMae.addEventListener("dragover", (e) => {
    e.preventDefault();
});

placaMae.addEventListener("drop", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (dragging) {
        const ferramentaId = dragging.id;
        if (ferramentaId === "soprador-termico") {
            dragging.removeAttribute("draggable");
            placaMae.style.filter = "brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)";
        } else if (ferramentaId === "alicate") {
            dragging.removeAttribute("draggable");
            placaMae.src = "../images/lab-virtual/placas/placa_nua.png";
            placaMae.style.filter = "none"; // Voltar à cor normal
            placaMae.setAttribute("draggable", "true");
        }
    }
});

let tesouraPassagens = 0;

tesouraMecanica.addEventListener("dragover", (e) => {
    e.preventDefault();
});

tesouraMecanica.addEventListener("drop", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (dragging && dragging.id === "placa-mae") {
        tesouraPassagens++;
        if (tesouraPassagens === 1) {
            placaMae.src = "../images/lab-virtual/placas/placa_cortada_verticalmente.png";
        } else if (tesouraPassagens === 2) {
            placaMae.src = "../images/lab-virtual/placas/placa_cortada_horizontalmente.png";
            placaMae.removeAttribute("draggable");
        }
    }

const appliedEPIs = new Set();
let personagemSelecionado = null;
let personagemGenero = null;

function selecaoPersonagem(personagem) {
    document.querySelectorAll('.personagem').forEach(card => {
        card.classList.remove('selecionado');
    });

    document.getElementById(`personagem${personagem}`).classList.add('selecionado');
    personagemSelecionado = personagem;
    personagemGenero = personagem === 'M' ? 'masculino' : 'feminino';
    document.getElementById('btn-start').classList.remove("invisible");
}

function iniciarJogo() {
    document.getElementById('btn-start').classList.add("invisible");
    document.getElementById('seletor-personagem').classList.add("invisible");
    const personagem = document.getElementById('personagem');
    personagem.src = `../images/lab-virtual/personagens/${personagemGenero}/personagem.png`;
    document.getElementById('fase-epi').classList.remove("invisible");
}

function salvarSelecao() {
    console.log(personagemSelecionado);
    iniciarJogo();
}

document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("epi")) {
        e.target.classList.add("dragging");
    }
});

document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("epi")) {
        e.target.classList.remove("dragging");
    }
});

const personagem = document.getElementById("personagem");


personagem.addEventListener("dragover", (e) => {
    e.preventDefault();
});

personagem.addEventListener("drop", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (dragging && dragging.classList.contains("epi")) {
        const epiId = dragging.id;
        appliedEPIs.add(epiId);
        updatePersonagemImage();
        dragging.remove();
    }
});

function updatePersonagemImage() {
    const epiCombination = Array.from(appliedEPIs).sort().join('_');
    personagem.src = `../images/lab-virtual/personagens/${personagemGenero}/personagem_${epiCombination}.png`;
    document.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("ferramenta") && e.target.getAttribute("draggable") === "true") {
            e.target.classList.add("dragging");
        }
    });
}
document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("ferramenta") && e.target.getAttribute("draggable") === "true") {
        e.target.classList.add("dragging");
    }
});

document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("ferramenta")) {
        e.target.classList.remove("dragging");
    }
});

const placaMae = document.getElementById("placa-mae");
const tesouraMecanica = document.getElementById("tesoura-mecanica");

placaMae.addEventListener("dragover", (e) => {
    e.preventDefault();
});

placaMae.addEventListener("drop", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (dragging) {
        const ferramentaId = dragging.id;
        if (ferramentaId === "soprador-termico") {
            dragging.removeAttribute("draggable");
            placaMae.style.filter = "brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)";
        } else if (ferramentaId === "alicate") {
            dragging.removeAttribute("draggable");
            placaMae.src = "../images/lab-virtual/placas/placa_nua.png";
            placaMae.style.filter = "none"; // Voltar à cor normal
            placaMae.setAttribute("draggable", "true");
        }
    }
});

let tesouraPassagens = 0;

tesouraMecanica.addEventListener("dragover", (e) => {
  e.preventDefault();
});

tesouraMecanica.addEventListener("drop", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (dragging && dragging.id === "placa-mae") {
        tesouraPassagens++;
        if (tesouraPassagens === 1) {
            placaMae.src = "../images/lab-virtual/placas/placa_cortada_verticalmente.png";
        } else if (tesouraPassagens === 2) {
            placaMae.src = "../images/lab-virtual/placas/placa_cortada_horizontalmente.png";
            placaMae.removeAttribute("draggable");
        }
    }

});
