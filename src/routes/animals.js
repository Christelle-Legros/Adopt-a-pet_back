const animalsRouter = require('express').Router();
const Animal = require('../models/animal');

// animalsRouter.get('/coucou', (req, res) => {
//   res.status(200).send('hibou');
// });

animalsRouter.get('/', (req, res) => {
  Animal.getAllAnimals().then(([result]) => res.status(200).json(result));
});

animalsRouter.get('/:id', (req, res) => {
  const id_animal = req.params.id;
  Animal.getOneAnimal(id_animal)
    .then((animal) =>
      animal ? res.status(200).json(animal) : res.sendStatus(404)
    )
    .catch((err) => res.status(404).send(err));
});

animalsRouter.post('/', (req, res) => {
  Animal.addAnimal(req.body)
    .then((animal) => {
      res.status(201).json(animal);
    })
    .catch((err) => res.status(404).send(err));
});

animalsRouter.delete('/:id', (req, res) => {
  const id_animal = req.params.id;
  Animal.deleteAnimal(id_animal)
    .then((deleted) => {
      if (deleted) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

animalsRouter.put('/:id', (req, res) => {
  const id_animal = req.params.id;
  const valueToChange = req.body;
  Animal.updateAnimal(id_animal, valueToChange)
    .then((updated) => {
      if (updated) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = animalsRouter;
