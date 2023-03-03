const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-input');
const greeting = document.querySelector('#greeting');
const HIDDEN_NAME = 'hidden';

function paintGreeting(username) {
  greeting.classList.remove(HIDDEN_NAME);
  greeting.innerText = `Hello ${username}`;
}

function loginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;

  loginForm.classList.add(HIDDEN_NAME);
  localStorage.setItem('username', username);
  paintGreeting(username);
}

const savedUsername = localStorage.getItem('username');

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_NAME);
  loginForm.addEventListener('submit', loginSubmit);
} else {
  paintGreeting(savedUsername);
}
