document
  .querySelector("#login-form")
  .addEventListener("submit", function (event, req, res) {
    event.preventDefault();
    let formData = new FormData(this);
    let formDataJson = JSON.stringify(Object.fromEntries(formData));
    fetch("../login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJson,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "/";
          alert("Login realizado com sucesso!");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
