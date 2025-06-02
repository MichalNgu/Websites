const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

const filePath = path.join(__dirname, 'data', 'todos.json');

app.get('/api/todos', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));
    const newTodo = {
        text: req.body.text,
        completion: false
    };
    todos.push(newTodo);
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
    res.status(201).json(newTodo);
});

app.put('/api/todos/:index', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));
    const index = parseInt(req.params.index);
    if (todos[index]) {
        todos[index].completion = !todos[index].completion;
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
        res.json(todos[index]);
    } else {
        res.status(404).json({ error: 'Úkol nenalezen' });
    }
});

app.delete('/api/todos/:index', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));
    const index = parseInt(req.params.index);
    if (todos[index]) {
        const removed = todos.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
        res.json(removed[0]);
    } else {
        res.status(404).json({ error: 'Úkol nenalezen' });
    }
});

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});

// spoustění serveru: node server.js