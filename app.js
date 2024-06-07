const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');

const app = express();
const port = 8084;

// Подключение к базе данных
const db = new sqlite3.Database('auth.db');

// Создание таблицы пользователей, если она не существует
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
)`);

// Функция регистрации
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log(2);

  // Проверка валидности email и пароля
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).send('Invalid email or password');
  }

  // Проверка, существует ли уже пользователь с таким email
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).send('User with this email already exists');
  }

  // Хеширование пароля
  const passwordHash = await bcrypt.hash(password, 10);

  // Сохранение пользователя в базе данных
  await db.run(`INSERT INTO users (email, password_hash) VALUES (?, ?), [email, passwordHash]`);

  // Отправка приветственного сообщения
  res.send('Registration successful!');
});

// Функция входа
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Проверка валидности email и пароля
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).send('Invalid email or password');
  }

  // Поиск пользователя по email
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).send('User not found');
  }

  // Сравнение хешированных паролей
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(401).send('Incorrect password');
  }


  res.send('Успешный вход');
});


async function getUserByEmail(email) {
  const result = await db.get(`SELECT * FROM users WHERE email = ?, [email]`);
  return result ? result : null;
}
function validateEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/;
  return regex.test(email);
}

function validatePassword(password) {
  const minLength = 8;

  if (password.length < minLength) {
    return false;
  }

  return true;
}

app.get('/', (req, res) => {
  app.use(express.static(__dirname + '/public'));
  const absolutePath = __dirname +'/main/index.html';
  res.sendFile(absolutePath);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});