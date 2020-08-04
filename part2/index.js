const fs = require("fs"); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const DB_PATH = './db.json';
const db = require(DB_PATH);

const PORT = 3001;
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

const generateId = () => {
    const maxId = db.persons.length > 0 ? Math.max(...db.persons.map(person => person.id)) : 0;
    return maxId + 1;
};

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
    res.json(db.persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const person = db.persons.filter(person => person.id === id);
    res.json(person);
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body) {
      return response.status(400).json({ error: 'content missing' });
    };

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    const repeatData = db.persons
                            .filter(person => person.name === body.name || person.number === body.number)
                            .length;

    if (repeatData > 0) {
        return res.status(400).json({ error: 'name or number must be unique' });
    } else {
        const newPersons = db.persons.concat(person);
        fs.writeFile(DB_PATH, JSON.stringify({ persons: newPersons }), err => { 
            if (err) throw err;
            console.log("Done writing"); 
            res.json(newPersons);
        });
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const persons = db.persons;
    const newPersons = persons.filter(person => person.id !== id);

    if (persons.length === newPersons.length) {
        res.status(404).end();
    } else {
        fs.writeFile(DB_PATH, JSON.stringify({ persons: newPersons }), err => { 
            if (err) throw err;
            console.log("Done writing"); 
            res.status(204).end();
        });
    }
});

app.get('/api/info', (req, res) => {
    const time = Date(Date.now());
    const template = `
        <p>Phonebook has info for ${db.persons.length} people.</p>
        <p>The current date is: ${time} .</p>
    `;
    res.send(template);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

app.use(unknownEndpoint);