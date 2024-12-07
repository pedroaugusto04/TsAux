
document.addEventListener('DOMContentLoaded', () => {
    // Cria uma função para carregar o menu
    function loadMenu() {
        fetch('../partials/menu.html')
            .then(response => response.text())
            .then(data => {
                const menuContainer = document.createElement('header');
                menuContainer.innerHTML = data;
                document.body.insertBefore(menuContainer, document.body.firstChild);


            })
            .catch(error => console.error('Error loading the menu:', error));
    }

    // Carrega o menu
    loadMenu();

});

//função para identificar pagina atual;
function currentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    return page;
}

//funcao para ativar no menu a pagina atual

function activeMenu() {
    const currentPageName = currentPage();
    const navElement = document.querySelector('nav');
    const links = navElement.querySelectorAll('a');
    links.forEach(link => {
        if (link.href.includes(currentPageName)) {
            link.classList.add('active');
        }
    });
}

function openMenu() {
    activeMenu();
    const hamburgerElement = document.querySelector('.hamburger');
    const navElement = document.querySelector('nav');
    const navListElement = document.querySelector('.nav_list');

    if (navElement.classList.contains("hidden")) {
        navElement.classList.remove("hidden");
        navElement.style.transform = "translateY(-100%)";
        setTimeout(() => {
            navElement.style.transition = "transform 0.3s ease-in-out";
            navElement.style.transform = "translateY(0)";
            navListElement.classList.add("nav_list--open");
        }, 10); // Pequeno atraso para garantir que a transição seja aplicada
    } else {
        navElement.style.transition = "transform 0.3s ease-in-out";
        navElement.style.transform = "translateY(-100%)";
        navListElement.classList.remove("nav_list--open");
        setTimeout(() => {
            navElement.classList.add("hidden");
        }, 300); // Tempo da animação
    }

    hamburgerElement.classList.toggle("hamburger--open");

document.addEventListener('DOMContentLoaded', () => {
    // Cria uma função para carregar o menu
    function loadMenu() {
        fetch('../partials/menu.html')
            .then(response => response.text())
            .then(data => {
                const menuContainer = document.createElement('header');
                menuContainer.innerHTML = data;
                document.body.insertBefore(menuContainer, document.body.firstChild);


            })
            .catch(error => console.error('Error loading the menu:', error));
    }

    // Carrega o menu
    loadMenu();

});

//função para identificar pagina atual;
function currentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    return page;
}

//funcao para ativar no menu a pagina atual

function activeMenu() {
    const currentPageName = currentPage();
    const navElement = document.querySelector('nav');
    const links = navElement.querySelectorAll('a');
    links.forEach(link => {
        if (link.href.includes(currentPageName)) {
            link.classList.add('active');
        }
    });
}


    function openMenu() {
        const hamburgerElement = document.querySelector('.hamburger');
        const navElement = document.querySelector('nav');
        const navListElement = document.querySelector('.nav_list');

        if (navElement.classList.contains("hidden")) {
            navElement.classList.remove("hidden");
            setTimeout(() => {
                navElement.style.transform = "translateY(0)";
                navElement.style.opacity = "1";
                navListElement.style.opacity = "1";
            }, 10); // Pequeno atraso para garantir que a transição seja aplicada
        } else {
            navElement.style.transform = "translateY(-100%)";
            navElement.style.opacity = "0";
            navListElement.style.opacity = "0";
            setTimeout(() => {
                navElement.classList.add("hidden");
            }, 300); // Tempo da animação
        }

        hamburgerElement.classList.toggle("hamburger--open");
    }}