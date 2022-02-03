const authRouteur = require('express').Router();
const {
  getOneAssociationByEmail,
  verifyPassword,
} = require('../models/association');
const { calculateToken } = require('../helpers/users');

authRouteur.post('/login', (req, res) => {
  const { email, password } = req.body;

  getOneAssociationByEmail(email)
    .then(([users]) => users[0])
    .then((user) => {
      if (!user) {
        res.status(422).send('email incorrect');
      } else {
        verifyPassword(password, user.password).then((passwordOk) => {
          if (passwordOk) {
            const token = calculateToken(email, user.id_user);

            res.cookie('monCookie', token);
            res.send();
          }
        });
      }
    });
});

module.exports = authRouteur;
