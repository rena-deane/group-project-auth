var express = require('express')
var passport = require('passport')
var router = express.Router()
var knex = require('../database/config')
var db = require('../database/utils')(knex);


router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('/login', function(req, res, next) {
  res.render('login', {message: 'Please enter your details:'})
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/logout'
}))

router.get('/user', function(req, res, next) {
  console.log('hi')
  res.render('profile')
})

router.post('/user', function(req, res, next) {
  console.log('name: ', req.body.username)
  console.log('password: ', req.body.password)
  db.addUser('users', req.body, function(err, res) {
    if(err) {
      console.error(err)
    } else {
      console.log('User added to the database')
    }
  })
})

router.get('/user/:username', function(req, res, next) {
  res.render('profile')
})

router.get('/user/new', function(req, res, next) {
  res.render('login', {message: 'You have been added, please login'})
})

router.get('/logout', function(req, res, next) {
  console.log('logged out')
  res.sendStatus(200)
})

router.post('/logout', function(req, res, next) {
  console.log('logout route', req)
  res.sendStatus(200)
})

module.exports = router
