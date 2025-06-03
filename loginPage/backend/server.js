const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

app.post('/api/signup', (req, res) => {
  const { firstname, email, password } = req.body;
  if (!firstname || !email || !password) {
    return res.status(400).json({ message: 'Všechna pole jsou povinná.' });
  }

  const users = getUsers();
  if (users.find(user => user.email === email)) {
    return res.status(409).json({ message: 'Uživatel již existuje.' });
  }

  users.push({ firstname, email, password });
  saveUsers(users);
  res.status(201).json({ message: 'Registrace úspěšná.' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Neplatný e-mail nebo heslo.' });
  }

  res.json({ message: `Vítej ${user.firstname}!` });
});

function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
