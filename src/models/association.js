const connection = require('../../db-config');

const getAllAssociations = () => {
  return connection.promise().query('SELECT * FROM associations');
};

const getOneAssociation = (id) => {
  return connection
    .promise()
    .query('SELECT * FROM associations WHERE id_association = ?', [id])
    .then(([results]) => results[0]);
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
    )
    .then(([result]) => {
      return { id: result.insertId, ...association };
    });
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

module.exports = {
  getAllAssociations,
  getOneAssociation,
  addAssociation,
  deleteAssociation,
  updateAssociation,
};
