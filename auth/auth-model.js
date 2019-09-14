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

async function insert(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findBy(filter) {
  return db('users').where(filter);
}