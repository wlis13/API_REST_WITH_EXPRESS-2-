const express = require('express');
const { deleteCard, updateCard } = require('./utils');

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
  res.status(200).json(teams);
});

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);
  res.status(201).json({ team: newTeam });
});

app.get('/teams/:id', (req, res) => {
  res.status(200).json({ team: 'team' });
});

app.put('/teams/:id/:newName/:newInitials', (req, res) => {
  const { id, newName, newInitials } = req.params;
  // const { name, initials } = req.body;

  const updateTeam = teams.find((iten) => iten.id === Number(id));

  if (!updateTeam) {
    res.status(404).json({ message: 'Team not found' });
    return;
  }

  updateTeam.name = newName;
  updateTeam.initials = newInitials;
  res.status(200).json({ updateTeam });
});

app.put('/cards/:id', async (req, res) => {
  const { id } = req.params;
  const valueBody = req.body;

  const getFunction = await updateCard(Number(id), valueBody);

  res.status(200).json({ card: getFunction });
});

app.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  await deleteCard(Number(id));
  res.status(204).end();
});

module.exports = app;