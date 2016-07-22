var express = require('express')
var router = express.Router()
var knex = require('../database/config')
var db = require('../database/utils')(knex);


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
  console.log('name: ', req.body.username)
  console.log('password: ', req.body.password)
  db.addUser('users', req.body, function(err, res) {
    if(err) {
      console.error(err)
    } else {
      console.log('User added to the database')
    }
  })
  res.sendStatus(200)
})

router.post('/logout', function(req, res, next) {
  console.log(req)
  res.sendStatus(200)
})

module.exports = router
