const db = require('../database/dbConfig.js');

module.exports = {
  insert,
  findBy,
  findById
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function insert() {

}

function findBy() {

}