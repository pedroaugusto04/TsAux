const PontoDeDescarte = class PontoDeDescarte {
    constructor(nome, telefone, endereco, site, reciclaveis) {
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.site = site;
        this.reciclaveis = reciclaveis;
    }
}

var map;
const pontosDeDescarte = [new PontoDeDescarte("Academia B7", "031986551777",
    "Av. Felipe dos Santos, 170, Cidade Nobre. Ipatinga MG,Brazil","", []),
new PontoDeDescarte("Sucataço", "03138485544", "Avenida Emalto 180 - Núcleo industrial",
    "", []),
new PontoDeDescarte("EcoMetals", "031973019352", "BR-381, 200 - Núcleo De Industrial, Timóteo - MG",
    "", ["Eletrônicos"]),
new PontoDeDescarte("Sucatão ViraMundo", "0313414789", "Avenida  Presidente Tancredo de Almeida Neves,Cel. Fabriciano - MG",
    "", ["Placa de computador, sucata"]),
new PontoDeDescarte("Reciclagem Pais e Filhos", "031986556992", "Chácaras Oliveira, Ipatinga-MG, 35163-206",
 "https://reciclagem-pais-e-filhos.negocio.site/?utm_source=gmb&utm_medium=referral", []),
new PontoDeDescarte("EcoVale","", "Rua Paquetá 137 - Coronel Fabriciano-MG",
 "http://ecovalereciclagem.com.br/", ["Diversos materiais"]),
new PontoDeDescarte("Garrafaria Moreira", "", "Avenida Presidente Tancredo Neves 4634, Coronel Fabriciano-MG",
 "", ["Apenas sucata metálica"]),
new PontoDeDescarte("Reciclagem Ipatinga", "", "Rua Alfazema 184 - Esperança, Ipatinga-MG",
    "", ["Papelão", "Plástico", "Metais"]),
new PontoDeDescarte("BioVale", "031999938150", "Avenida Sanitária, 2311 - Limoeiro, Ipatinga-MG",
    "https://reciclagem-biovale-ipatinga-mg.negocio.site/", [])];

var position = navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,

});

var iconecoponto = L.icon({
    iconUrl: '../images/ecoponto.png',
    shadowUrl: '../images/sombra.png',

    iconSize: [60, 85], // size of the icon
    shadowSize: [60, 78], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 68],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var iconecopessoa = L.icon({
    iconUrl: '../images/pessoa.png',
    shadowUrl: '../images/sombra-pessoa.png',

    iconSize: [85, 85], // size of the icon
    shadowSize: [70, 78], // size of the shadow
    iconAnchor: [30, 113], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 94],  // the same for the shadow
    popupAnchor: [12, -106] // point from which the popup should open relative to the iconAnchor
});


function success(pos) {
    var abscissa = pos.coords.latitude;
    var ordenada = pos.coords.longitude;
    map = L.map('map').setView([abscissa, ordenada], 16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    marker = L.marker([abscissa, ordenada], { icon: iconecopessoa }).on('click', onClick).on('mouseover', onMouseOver).
        on('mouseout', onMouseOut).addTo(map);
    const userPoint = L.latLng(abscissa, ordenada);
    marker.bindPopup("Você está aqui");
    pontosDeDescarte.forEach(ponto => {
        fetch("https://nominatim.openstreetmap.org/search?q=" + ponto.endereco + "&format=json&limit=1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                var lat = data[0].lat;
                var lon = data[0].lon;
                marker = L.marker([lat, lon], { icon: iconecoponto }).on('click', onClick).on('mouseover', onMouseOver).
                    on('mouseout', onMouseOut).addTo(map);
                const placePoint = L.latLng(lat, lon);
                const distance = (userPoint.distanceTo(placePoint) / 1000).toFixed(2);
                marker.bindPopup(ponto.nome + " (" + distance + " km ) " + ponto.reciclaveis.join() + "\n");
                if (ponto.site) {
                    var popup = marker.getPopup();
                    var currentContent = popup.getContent();
                    popup.setContent(currentContent +
                        '<br><a href="' +
                        ponto.site + '" target="_blank">Visite o site</a>');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    )
}

function onClick(e) {
    window.open("https://www.google.com/maps?q=" + e.latlng.lat + "," + e.latlng.lng, '_blank');
}

function onMouseOver(e) {
    this.openPopup();
}

function onMouseOut(e) {
    var that = this;   
    setTimeout(function() {
        that.closePopup();
    }, 1500);
}

function error(err) {
    console.log(err);
}