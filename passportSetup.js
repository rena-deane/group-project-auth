var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var knex = require('./database/config')
var db = require('./database/utils')(knex)
var CryptoJS = require('crypto-js')

module.exports = function setup () {
  var strategy = new LocalStrategy(function(username, password, done) {
    db.findOne('users', { username }, function (err, user) {
      console.log(user)
      var dePassword = CryptoJS.AES.decrypt(user.password, username).toString(CryptoJS.enc.Utf8)
      console.log('dep', dePassword)
      var validUser = ((dePassword === password) && user)
      console.log(validUser)
      return done(null, validUser)
    })
  })

  passport.use(strategy)

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    db.findOne('users', { id }, function (err, user) {
      return done(null, user)
    })
  })
}
