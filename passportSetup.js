var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var knex = require('./database/config')
var db = require('./database/utils')(knex)

var users = [ { id: 1, username: 'username', password: 'password'} ]

module.exports = function setup () {
  var strategy = new LocalStrategy(function(username, password, done) {
    db.findOne('users', { username }, function (err, user) {
      console.log(user)
      return done(null, user)
    })
  })

  passport.use(strategy)

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    done(null, users.find(function (user) {
      return user.id === id
    }))
  })
}
