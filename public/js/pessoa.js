document.querySelector("#parceiros-form").addEventListener("submit", function (event) {
    []
    event.preventDefault();
    let formData = new FormData(this);
    fetch("../parceiros", {
        method: "POST",
        body: formData
    })
        .then(async response => {
            if (response.ok) {
                return response.text();
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            }
        })
        .then(message => {
            alert(message);
            window.location.href = "/";
        })
        .catch(error => {
            console.error(error);
        });
});