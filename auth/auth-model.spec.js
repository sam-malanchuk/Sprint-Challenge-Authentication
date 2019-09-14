const Auth = require('./auth-model.js');

const db = require('../database/dbConfig.js');

describe('The Auth model', () => {

  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('the insert function', () => {
    it('should insert a new user', async () => {
      const userData = { username: "test", password: "test123" };
      const user = await Auth.insert(userData);

      const users = await db('users');
      expect(users.length).toBe(1);
      expect(users[0].username).toBe('test');
    });
  });

  describe('the findBy function', () => {
    it('should find user(s) by any field filter', async () => {
      var userData = { username: "test", password: "test123" };
      var user = await db('users').insert(userData);
      userData = { username: "sam", password: "test123" };
      user = await db('users').insert(userData);
      userData = { username: "ethan", password: "test123" };
      user = await db('users').insert(userData);

      var getUser = await Auth.findBy({id: 1}).first();
      expect(getUser.username).toBe('test');
      getUser = await Auth.findBy({ username: "ethan" }).first();
      expect(getUser.id).toBe(3);
    });
  });

  describe('the findById function', () => {
    it('should find user by id', async () => {
      var userData = { username: "test", password: "test123" };
      var user = await db('users').insert(userData);
      userData = { username: "sam", password: "test123" };
      user = await db('users').insert(userData);
      userData = { username: "ethan", password: "test123" };
      user = await db('users').insert(userData);

      var getUser = await Auth.findById(2);
      expect(getUser.username).toBe('sam');
    });
  });
});
