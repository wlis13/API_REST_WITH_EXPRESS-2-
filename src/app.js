const express = require('express');

const app = express();
app.use(express.json());

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Cruzeiro Esporte Clube',
    initials: 'CEC',
  },
];

app.get('/', (req, res) => {
  res.status(200).json({ "text": "Hello World!" });
});

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body }
  teams.push(newTeam);
  res.status(201).json({ team: newTeam })
});

app.get('/teams', (req, res) => {
  res.status(200).json(teams)
})

module.exports = app;