const aguaOxigenada = document.getElementById("div-agua-oxigenada");
const aguaDestilada = document.getElementById("div-agua-destilada");
const acido = document.getElementById("div-acido-sulfurico");
const acidoSulfurico = document.getElementById("acido-sulfurico-img");
const balaoVolumetrico = document.getElementById("div-balao-volumetrico");
const balaoVolumetricoImg = document.getElementById("balao-volumetrico-img");
const bequer = document.getElementById("div-bequer");
const bequerImg = document.getElementById("bequer-img");
const placas = document.getElementById("div-placas");
const placasImg = document.getElementById("div-placas-img");
const pipeta = document.getElementById("div-pipeta");
const pipetaImg = document.getElementById("pipeta-img");
const agitadorMagnetico = document.getElementById("div-agitador-magnetico");
const agitadorMagneticoImg = document.getElementById("agitador-magnetico-img");
const divVideo = document.getElementById("div-video");

// states
const pipetaPreenchidaAguaOxigenada = "pipeta-preenchida-agua-oxigenada";
const pipetaPreenchidaAcido = "pipeta-preenchida-acido";
const pipetaPreenchidaAguaDestilada = "pipeta-preenchida-agua-destilada";
const pipetaPreenchidaSolucao = "pipeta-preenchida-solucao";
const bequerPreenchidoAcido = "bequer-preenchido-acido";
const bequerPreenchidoAcidoPlaca = "bequer-preenchido-acido-placa";
const bequerPreenchidoAcidoPlacaH2O2 = "bequer-preenchido-acido-placa-h2o2";
const bequerCobreSolubilizado = "bequer-cobre-solubilizado";
const balaoPreenchidoAcidoSulfurico = "balao-preenchido-acido-sulfurico";
const balaoPreenchidoAcidoSulfuricoAguaDestilada =
  "balao-preenchido-acido-sulfurico-agua-destilada";
const balaoPreenchidoAguaInicial = "balao-preenchido-agua-inicial";
const empty = "";
const divVideoFullscreen = "div-video-fullscreen";
const videoFullScreen = "video-fullscreen";
const piscandoVerde = "animated-green";
const piscandoVermelho = "animated-red";

pipeta.style.animation = "piscando-verde 2.5s infinite";
aguaDestilada.style.animation = "piscando-verde 2.5s infinite";

const videoAcidoAguaBalaoVolumetrico = document.getElementById(
  "video-acido-agua-balao-volumetrico"
);
const videoBequerAcido = document.getElementById("video-bequer-acido");

const videoBequerAcidoPlacas = document.getElementById(
  "video-bequer-acido-placas"
);
const videoPipetaPreenchida = document.getElementById("video-pipeta-acido");

const videoBequerAcidoPlacaAgua = document.getElementById(
  "video-bequer-acido-placa-agua"
);

const videoBequerCobreSolubilizado = document.getElementById(
  "video-cobre-solubilizado"
);

const videoAcidoBalaoVolumetrico = document.getElementById(
  "video-acido-balao-volumetrico"
);

const videoAguaBalaoVolumetrico = document.getElementById(
  "video-agua-balao-volumetrico"
);

const setState = (item, state) => {
  item.className = "";
  if (state !== empty) item.classList.add(state);
};

pipeta.addEventListener("dragstart", (e) => {
  dragImg(e);
  e.dataTransfer.setData("draggedElement", "aguaOxigenada");
});

acidoSulfurico.addEventListener("dragstart", (e) => {
  dragImg(e);
  e.dataTransfer.setData("draggedElement", "acidoSulfurico");
});

placas.addEventListener("dragstart", (e) => {
  dragImg(e);
  e.dataTransfer.setData("draggedElement", "placas");
});

balaoVolumetrico.addEventListener("dragstart", (e) => {
  dragImg(e);
  e.dataTransfer.setData("draggedElement", "balaoVolumetrico");
});

pipeta.addEventListener("dragstart", (e) => {
  dragImg(e);
  e.dataTransfer.setData("draggedElement", "pipeta");
});

bequer.addEventListener("dragstart", (e) => {
  dragImg(e);
  e.dataTransfer.setData("draggedElement", "bequer");
});

balaoVolumetrico.addEventListener("dragover", (e) => {
  dragImg(e);
  e.preventDefault();
});

bequer.addEventListener("dragover", (e) => {
  dragImg(e);
  e.preventDefault();
});

agitadorMagnetico.addEventListener("dragover", (e) => {
  dragImg(e);
  e.preventDefault();
});

balaoVolumetrico.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedElement = e.dataTransfer.getData("draggedElement");

  if (draggedElement === "pipeta") {
    if (pipeta.classList.contains(pipetaPreenchidaAguaDestilada)) {
      if (balaoVolumetrico.classList.length != 0) {
        if (
          !balaoVolumetrico.classList.contains(balaoPreenchidoAcidoSulfurico)
        ) {
          console.log("Pipeta não está preenchida com o líquido necessário");
          return;
        }
        balaoVolumetricoImg.style.display = "none";

        balaoVolumetrico.innerHTML = "";

        balaoVolumetrico.appendChild(videoAcidoAguaBalaoVolumetrico);

        playVideo(videoAcidoAguaBalaoVolumetrico);

        videoPipetaPreenchida.style.display = "none";

        pipetaImg.style.display = "block";

        setState(pipeta, empty);

        setState(balaoVolumetrico, balaoPreenchidoAcidoSulfuricoAguaDestilada);
      } else {
        balaoVolumetricoImg.style.display = "none";

        balaoVolumetrico.innerHTML = "";

        balaoVolumetrico.appendChild(videoAguaBalaoVolumetrico);

        playVideo(videoAguaBalaoVolumetrico);

        videoPipetaPreenchida.style.display = "none";

        pipetaImg.style.display = "block";

        setState(pipeta, empty);

        setState(balaoVolumetrico, balaoPreenchidoAguaInicial);

        balaoVolumetrico.style.animation = "";

        acido.style.animation = "piscando-verde 2.5s infinite";
      }
    } else if (pipeta.classList.contains(pipetaPreenchidaAcido)) {
      if (balaoVolumetrico.classList.length == 0) {
        console.log("Pipeta não está preenchida com o líquido necessário");
        return;
      }
      balaoVolumetricoImg.style.display = "none";

      balaoVolumetrico.innerHTML = "";

      balaoVolumetrico.appendChild(videoAcidoBalaoVolumetrico);

      playVideo(videoAcidoBalaoVolumetrico);

      videoPipetaPreenchida.style.display = "none";

      pipetaImg.style.display = "block";

      setState(pipeta, empty);

      setState(balaoVolumetrico, balaoPreenchidoAcidoSulfurico);

      balaoVolumetrico.style.animation = "";
      aguaDestilada.style.animation = "piscando-verde 2.5s infinite";
    } else if (
      pipeta.classList.length == 0 &&
      balaoVolumetrico.classList.contains(
        balaoPreenchidoAcidoSulfuricoAguaDestilada
      )
    ) {
      // pipeta vazia e balaoVolumetrico com a solucao feita
      balaoVolumetricoImg.style.display = "none";

      balaoVolumetrico.innerHTML = "";

      balaoVolumetrico.appendChild(videoAcidoBalaoVolumetrico);

      playVideo(videoAcidoBalaoVolumetrico);

      pipetaImg.style.display = "none";

      pipeta.appendChild(videoPipetaPreenchida);

      playVideo(videoPipetaPreenchida);

      setState(pipeta, pipetaPreenchidaSolucao);

      balaoVolumetrico.style.animation = "";
      bequer.style.animation = "piscando-verde 2.5s infinite";
    } else {
      console.log("Pipeta não está preenchida com o líquido necessário");
    }
  }
});

bequer.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedElement = e.dataTransfer.getData("draggedElement");
  if (draggedElement === "pipeta") {
    if (pipeta.classList.contains(pipetaPreenchidaSolucao)) {
      if (bequer.classList.length != 0) {
        console.log("Pipeta não está preenchida com o líquido necessário");
        return;
      }
      bequerImg.style.display = "none";

      bequer.innerHTML = "";

      bequer.appendChild(videoBequerAcido);

      playVideo(videoBequerAcido);

      videoPipetaPreenchida.style.display = "none";

      pipetaImg.style.display = "block";

      setState(pipeta, empty);

      setState(bequer, bequerPreenchidoAcido);

      pipeta.style.animation = "";
      placas.style.animation = "piscando-verde 2.5s infinite";
    } else if (pipeta.classList.contains(pipetaPreenchidaAguaOxigenada)) {
      if (!bequer.classList.contains(bequerPreenchidoAcidoPlaca)) {
        console.log("Pipeta não está preenchida com o líquido necessário");
        return;
      }
      bequerImg.style.display = "none";
      bequer.innerHTML = "";

      bequer.appendChild(videoBequerAcidoPlacaAgua);

      playVideo(videoBequerAcidoPlacaAgua);

      videoPipetaPreenchida.style.display = "none";

      pipetaImg.style.display = "block";

      setState(pipeta, empty);

      setState(bequer, bequerPreenchidoAcidoPlacaH2O2);

      pipeta.style.animation = "";
      agitadorMagnetico.style.animation = "piscando-verde 2.5s infinite";
    } else {
      return;
    }
  } else if (draggedElement === "placas") {
    if (!bequer.classList.contains(bequerPreenchidoAcido)) {
      console.log("Bequer deve estar preenchido com acido");
      return;
    }
    bequerImg.style.display = "none";

    bequer.innerHTML = "";

    bequer.appendChild(videoBequerAcidoPlacas);

    videoBequerAcidoPlacas.style.display = "block";
    videoBequerAcidoPlacas.play();

    setState(bequer, bequerPreenchidoAcidoPlaca);

    placas.style.animation = "";
    bequer.style.animation = "";
    aguaOxigenada.style.animation = "piscando-verde 2.5s infinite";
    pipeta.style.animation = "piscando-verde 2.5s infinite";
  }
});

aguaOxigenada.addEventListener("dragover", (e) => {
  e.preventDefault();
});

aguaOxigenada.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedElement = e.dataTransfer.getData("draggedElement");
  if (draggedElement === "pipeta") {
    pipetaImg.style.display = "none";

    pipeta.appendChild(videoPipetaPreenchida);

    playVideo(videoPipetaPreenchida);

    setState(pipeta, pipetaPreenchidaAguaOxigenada);

    aguaOxigenada.style.animation = "";
    bequer.style.animation = "piscando-verde 2.5s infinite";
  } else {
  }
});

aguaDestilada.addEventListener("dragover", (e) => {
  e.preventDefault();
});

aguaDestilada.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedElement = e.dataTransfer.getData("draggedElement");
  if (draggedElement === "pipeta") {
      pipetaImg.style.display = "none";

    pipeta.appendChild(videoPipetaPreenchida);

    playVideo(videoPipetaPreenchida);

    setState(pipeta, pipetaPreenchidaAguaDestilada);

    pipeta.style.animation = "";
    aguaDestilada.style.animation = "";

    pipeta.style.animation = "piscando-verde 2.5s infinite";
    balaoVolumetrico.style.animation = "piscando-verde 2.5s infinite";
  } else {
  }
});

acido.addEventListener("dragover", (e) => {
  e.preventDefault();
});

acido.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedElement = e.dataTransfer.getData("draggedElement");
  if (draggedElement === "pipeta") {
    pipetaImg.style.display = "none";

    pipeta.appendChild(videoPipetaPreenchida);

    playVideo(videoPipetaPreenchida);

    setState(pipeta, pipetaPreenchidaAcido);

    acido.style.animation = "";
    balaoVolumetrico.style.animation = "piscando-verde 2.5s infinite";
  } else {
  }
});

agitadorMagnetico.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedElement = e.dataTransfer.getData("draggedElement");
  if (draggedElement === "bequer") {
    if (!bequer.classList.contains(bequerPreenchidoAcidoPlacaH2O2)) {
      console.log(
        "Bequer deve conter o acido, as placas e a agua oxigenada para ser agitado"
      );
      return;
    }
    bequerImg.style.display = "none";
    bequer.innerHTML = "";

    bequer.appendChild(videoBequerCobreSolubilizado);

    playVideo(videoBequerCobreSolubilizado);

    setState(bequer, bequerCobreSolubilizado);

    agitadorMagnetico.style.animation = "";
  }
});
const dragImg = (e) => {
  const emptyImage = new Image();
  e.dataTransfer.setDragImage(emptyImage, 0, 0);
};

const playVideo = (video) => {
  video.style.display = "block";
  video.play();
};
