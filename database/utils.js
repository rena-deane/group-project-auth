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
  };
};