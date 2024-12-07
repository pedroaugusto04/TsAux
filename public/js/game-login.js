const botao = document.querySelector('.login_game_button');
const input = document.querySelector('.login_game_input');
const form = document.querySelector('.login-game-form');

botao.setAttribute('disabled', '');

const validateInput = ({ target }) => {
  if ((target.value.length > 3)&(target.value.length < 15)) {
    botao.removeAttribute('disabled');
    return;
  }

  botao.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location.href = '/pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);