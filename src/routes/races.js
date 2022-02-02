const racesRouter = require('express').Router();
const Race = require('../models/race');

racesRouter.get('/', (req, res) => {
  Race.getAllRaces().then(([result]) => res.status(200).json(result));
});

racesRouter.get('/:id', (req, res) => {
  const id_race = req.params.id;
  Race.getOneRace(id_race)
    .then((race) => (race ? res.status(200).json(race) : res.sendStatus(404)))
    .catch((err) => res.status(404).send(err));
});

racesRouter.post('/', (req, res) => {
  Race.addRace(req.body)
    .then((race) => {
      res.status(201).json(race);
    })
    .catch((err) => res.status(404).send(err));
});

racesRouter.delete('/:id', (req, res) => {
  const id_race = req.params.id;
  Race.deleteRace(id_race)
    .then((deleted) => {
      if (deleted) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

racesRouter.put('/:id', (req, res) => {
  const id_race = req.params.id;
  const valueToChange = req.body;
  Race.updateRace(id_race, valueToChange)
    .then((updated) => {
      if (updated) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = racesRouter;
