var express = require('express')
var passport = require('passport')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.get('/user', function(req, res, next) {
  console.log('hi')
  res.render('profile')
})

router.post('/user', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/logout'
}))

router.get('/user/new', function(req, res, next) {
  console.log(req)
  res.render('register')
  res.sendStatus(200)
})

router.get('/logout', function(req, res, next) {
  console.log('logged out')
  res.sendStatus(200)
})

// router.post('/logout', function(req, res, next) {
//   console.log('logged out')
//   res.sendStatus(200)
// })

module.exports = router
