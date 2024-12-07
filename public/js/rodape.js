document.addEventListener('DOMContentLoaded', () => {
    function loadFooter() {
        fetch('../partials/rodape.html')
            .then(response => response.text())
            .then(data => {
                // Cria um elemento para o footer
                const footerContainer = document.createElement('div');
                footerContainer.innerHTML = data;

                // Adiciona o footer ao final do body
                document.body.appendChild(footerContainer);
            })
            .catch(error => console.error('Error loading the footer:', error));
    }

    // Carrega o footer
    loadFooter();
});