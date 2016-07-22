var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.get('/register', function(req, res, next) {
  res.render('register')
})

router.get('/user/:username', function(req, res, next) {
  res.render('profile')
})

router.post('/user', function(req, res, next) {
  console.log(req)
  res.sendStatus(200)
})

router.post('/user/new', function(req, res, next) {
  console.log(req)
  res.sendStatus(200)
})

router.post('/logout', function(req, res, next) {
  console.log(req)
  res.sendStatus(200)
})

module.exports = router
