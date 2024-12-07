function login() {
  window.location.href = "../../pages/login.html";
}

function logout() {
  fetch("../logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("isLoggedIn","false");
        window.location.href = "/";
        alert("Logout realizado com sucesso!");
      }
    });
}
