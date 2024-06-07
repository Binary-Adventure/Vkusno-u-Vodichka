const toggleButton = document.querySelector('.navbar-toggler');
const navCollapse = document.querySelector('.navbar-collapse');

toggleButton.addEventListener('click', () => {
  navCollapse.classList.toggle('show');
});

$(document).ready(function(){
  $('.header').height($(window).height());
 })


const authModal = document.querySelector('.auth-modal');
const openAuthModalButton = document.querySelector('.purchase-menu button'); 
openAuthModalButton.addEventListener('click', () => {
  authModal.classList.add('show');
});



const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
  if (data.message === 'Успешный вход') {
    // Закрыть модальное окно входа
    loginFormModal.classList.remove('show');
    // Сохранить информацию о пользователе в сессии/локальном хранилище
    localStorage.setItem('user', JSON.stringify({ email }));
    // Отобразить приветственное сообщение
    const welcomeMessageElement = document.getElementById('welcome-message');
    welcomeMessageElement.textContent = ```Приветствуем, ${email.split('@')[0]}!```;
  } else {
    // Отобразить сообщение об ошибке
    alert(data.message);
  }

});


const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('registrationEmail').value;
  const password = document.getElementById('registrationPassword').value;

  fetch('/regestration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
  const data = await response.json();

  if (data.message === 'Регистрация успешна') {
    // Закрыть модальное окно регистрации
    registrationFormModal.classList.remove('show');
    // Отобразить сообщение об успешной регистрации
    alert('Регистрация успешна!');
  } else {
    // Отобразить сообщение об ошибке
    alert(data.message);
  }
});

window.addEventListener('load', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const welcomeMessageElement = document.getElementById('welcome-message');
    welcomeMessageElement.textContent = ```Приветствуем, ${user.email.split('@')[0]}!```;
  }
});