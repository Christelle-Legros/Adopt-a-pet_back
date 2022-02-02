const associationsRouter = require('express').Router();
const Association = require('../models/association');

associationsRouter.get('/', (req, res) => {
  Association.getAllAssociations().then(([result]) =>
    res.status(200).json(result)
  );
});

associationsRouter.get('/:id', (req, res) => {
  const id_association = req.params.id;
  Association.getOneAssociation(id_association)
    .then((association) =>
      association ? res.status(200).json(association) : res.sendStatus(404)
    )
    .catch((err) => res.status(404).send(err));
});

associationsRouter.post('/', (req, res) => {
  Association.addAssociation(req.body)
    .then((association) => {
      res.status(201).json(association);
    })
    .catch((err) => res.status(404).send(err));
});

associationsRouter.delete('/:id', (req, res) => {
  const id_association = req.params.id;
  Association.deleteAssociation(id_association)
    .then((deleted) => {
      if (deleted) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

associationsRouter.put('/:id', (req, res) => {
  const id_association = req.params.id;
  const valueToChange = req.body;
  Association.updateAlbum(id_association, valueToChange)
    .then((updated) => {
      if (updated) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = associationsRouter;
