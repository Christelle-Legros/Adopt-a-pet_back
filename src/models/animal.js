const connection = require('../../db-config');

const getAllAnimals = () => {
  return connection.promise().query('SELECT * FROM animals');
};

const getOneAnimal = (id) => {
  return connection
    .promise()
    .query('SELECT * FROM animals WHERE id_animal = ?', [id])
    .then(([results]) => results[0]);
};

const addAnimal = (animal) => {
  return connection
    .promise()
    .query(
      'INSERT INTO animals (id_animal, name, species, picture_link, id_association) VALUES (?, ?, ?, ?, ?)',
      [
        animal.id_animal,
        animal.name,
        animal.species,
        animal.picture_link,
        animal.id_association,
      ]
    )
    .then(([result]) => {
      return { id: result.insertId, ...animal };
    });
};

const deleteAnimal = (id) => {
  return connection
    .promise()
    .query('DELETE FROM animals WHERE id_animal =  ?', [id])
    .then((result) => result.affectedRows !== 0);
};

const updateAnimal = (id, newAttribute) => {
  return connection
    .promise()
    .query('UPDATE animals SET ? WHERE id_animal = ?', [newAttribute, id]);
};

module.exports = {
  getAllAnimals,
  getOneAnimal,
  addAnimal,
  deleteAnimal,
  updateAnimal,
};
