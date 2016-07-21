exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'dank', password:'password'}),
        knex('users').insert({username: 'oliwba', password:'password'}),
        knex('users').insert({username: 'rena-deane', password:'password'})
      ]);
    });
};
