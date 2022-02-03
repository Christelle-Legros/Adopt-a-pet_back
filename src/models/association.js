const connection = require('../../db-config');
const argon = require('argon2');
const Joi = require('joi');

const getAllAssociations = () => {
  return connection.promise().query('SELECT * FROM associations');
};

const getOneAssociation = (id) => {
  return connection
    .promise()
    .query('SELECT * FROM associations WHERE id_association = ?', [id])
    .then(([results]) => results[0]);
};

const getOneAssociationByEmail = (email) => {
  return connection
    .promise()
    .query('SELECT * FROM associations WHERE email = ?', [email])
    .then(([results]) => results[0]);
};

const validate = (data) => {
  return Joi.object({
    name_association: Joi.string().max(255).required(),
    address: Joi.string().max(255).required(),
    postal_code: Joi.string().max(10).required(),
    city: Joi.string().max(150).required(),
    phone: Joi.string().max(20).required(),
    email: Joi.string().email().max(150).required(),
    password: Joi.string().min(5).max(15).required(),
  }).validate(data, { abortEarly: false }).error;
};

const addAssociation = (association) => {
  return connection
    .promise()
    .query(
      'INSERT INTO associations (id_association, name_association, address, postal_code, city, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        association.id_association,
        association.name_association,
        association.address,
        association.postal_code,
        association.city,
        association.phone,
        association.email,
        association.password,
      ]
    );
};

const deleteAssociation = (id) => {
  return connection
    .promise()
    .query('DELETE FROM associations WHERE id_association =  ?', [id])
    .then((result) => result.affectedRows !== 0);
};

const updateAssociation = (id, newAttribute) => {
  return connection
    .promise()
    .query('UPDATE associations SET ? WHERE id_association = ?', [
      newAttribute,
      id,
    ]);
};

const hashOptions = {
  type: argon.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const cryptePassword = (password) => {
  return argon.hash(password, hashOptions);
};

const verifyPassword = (password, hashedPassword) => {
  return argon.verify(hashedPassword, password, hashOptions);
};

module.exports = {
  getAllAssociations,
  getOneAssociation,
  getOneAssociationByEmail,
  addAssociation,
  deleteAssociation,
  updateAssociation,
  cryptePassword,
  verifyPassword,
  validate,
};
