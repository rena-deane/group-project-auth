const test = require('tape');
const knex = require('../database/config')
const db = require('../database/utils')(knex);

test('getAll', (t) => {
  t.ok(true)

  const expected = [
    { id: 1, username: 'dank', password:'password'},
    { id: 2, username: 'oliwba', password:'password'},
    { id: 3, username: 'rena-deane', password:'password'}
  ];

  knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.seed.run('users');
    })
    .then(() => {
      db.getAll('users', (err, data) => {
        t.deepEqual(data, expected, 'gets all data from users table');
        t.end();
      })
    })
    .catch(err => {
      console.log(err);
    })
});

test('getAll', (t) => {
  t.ok(true)

  const expected = { id: 1, username: 'dank', password:'password' };

  knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.seed.run('users');
    })
    .then(() => {
      db.findOne('users', { username: expected.username }, (err, data) => {
        t.deepEqual(data, expected, 'finds one user: dank');
        t.end();
        knex.destroy();
      })
    })
    .catch(err => {
      console.log(err);
    })
});
