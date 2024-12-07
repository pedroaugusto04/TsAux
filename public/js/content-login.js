const isLoggedIn = localStorage.getItem("isLoggedIn");
const button = document.getElementById("button-login");
if (isLoggedIn === "true") {
    button.textContent = "Logout";
    button.onclick = function () {
        logout();
    };
    const pUserName = document.getElementById("pUserName");
    fetch("../sessionUserName", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        pUserName.textContent = "Olá, "+data;
    })
} else {
    button.textContent = "Login";
    button.onclick = function () {
        login();
    }
}