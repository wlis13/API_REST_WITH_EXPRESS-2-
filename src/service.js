const express = require('express');

const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.json());

const readMovies = async () => {
  const data = await fs.readFile(path.resolve(__dirname, '../movies.json'));
  const jsonData = JSON.parse(data);
  return jsonData;
};

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const getMovies = await readMovies();
  const chooseForId = getMovies.filter((iten) => iten.id === Number(id));
  res.status(200).send(chooseForId);
});

app.get('/movies', async (req, res) => {
  const getMovies = await readMovies();
  res.status(200).json(getMovies);
});

app.post('/movies', async (req, res) => {
  const newMovie = req.body;
  const getMovies = await readMovies();
  const allMovies = [...getMovies, newMovie];

  return res.status(201).json(allMovies);
});

module.exports = app;