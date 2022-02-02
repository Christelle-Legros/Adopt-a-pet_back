const connection = require('../../db-config');

const getAllRaces = () => {
  return connection.promise().query('SELECT * FROM races');
};

const getOneRace = (id) => {
  return connection
    .promise()
    .query('SELECT * FROM races WHERE id_race = ?', [id])
    .then(([results]) => results[0]);
};

const addRace = (race) => {
  return connection
    .promise()
    .query('INSERT INTO races (id_race, name) VALUES (?, ?)', [
      race.id_race,
      race.name,
    ])
    .then(([result]) => {
      return { id: result.insertId, ...race };
    });
};

const deleteRace = (id) => {
  return connection
    .promise()
    .query('DELETE FROM races WHERE id_race =  ?', [id])
    .then((result) => result.affectedRows !== 0);
};

module.exports = {
  getAllRaces,
  getOneRace,
  addRace,
  deleteRace,
};
