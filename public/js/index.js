

document.querySelector("#register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    let formDataJson = JSON.stringify(Object.fromEntries(formData));
    if (formData.get("email")) {
        if (formData.get("password") === formData.get("password2")) {
            fetch("../pessoa/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: formDataJson
            }).then(async responseEmail => {
                if (responseEmail.ok) {
                    fetch("../pessoa", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: formDataJson
                    }).then(async response => {
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
                            window.location.href = "../../pages/login.html";
                        })
                        .catch(error => {
                            console.error(error);
                        })
                } else {
                    const errorMessage = await responseEmail.text();
                    alert(errorMessage);
                    throw new Error(errorMessage);
                }
            })
        } else {
            alert("As senhas inseridas não coincidem!")
        }
    } else {
        alert("O email informado não existe!")
    }
});



document.querySelector("#register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    let formDataJson = JSON.stringify(Object.fromEntries(formData));
    if (formData.get("email")) {
        if (formData.get("password") === formData.get("password2")) {
            fetch("../pessoa/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: formDataJson
            }).then(async responseEmail => {
                if (responseEmail.ok) {
                    fetch("../pessoa", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: formDataJson
                    }).then(async response => {
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
                            window.location.href = "../../pages/login.html";
                        })
                        .catch(error => {
                            console.error(error);
                        })
                } else {
                    const errorMessage = await responseEmail.text();
                    alert(errorMessage);
                    throw new Error(errorMessage);
                }
            })
        } else {
            alert("As senhas inseridas não coincidem!")
        }
    } else {
        alert("O email informado não existe!")
    }
});

