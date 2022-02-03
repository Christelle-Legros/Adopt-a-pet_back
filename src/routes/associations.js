const associationsRouter = require('express').Router();
const Association = require('../models/association');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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
  const {
    name_association,
    address,
    postal_code,
    city,
    phone,
    email,
    password,
  } = req.body;

  const validationErrors = Association.validate(req.body);

  if (validationErrors) {
    res.status(422).json(validationErrors.details);
  } else {
    Association.cryptePassword(password).then((hashedPassword) =>
      Association.addAssociation(
        name_association,
        address,
        postal_code,
        city,
        phone,
        email,
        hashedPassword
      )
        .then((result) => result[0].insertId) //CONSOLE LOG
        .then((id) => res.status(201).json({ id, ...req.body }))
        .catch((error) =>
          res.status(500).send('Impossible de créer cette association')
        )
    );
  }
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
