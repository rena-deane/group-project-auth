module.exports = function(knex) {

  return {
    getAll: function(table, callback) {
      knex.select().from(table)
        .then(function(resp) {
          callback(null, resp);
        })
        .catch(function(err){
          callback(err, null);
        });
    },

    addUser: function (table, obj, callback) {
      knex(table).returning('id').insert(obj)
        .then(function(res) {
          callback(null, res[0])
        })
        .catch(function(err){
          callback(err, null)
        });
    }

  };
};