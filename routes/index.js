var express = require('express')
var passport = require('passport')
var router = express.Router()
var knex = require('../database/config')
var db = require('../database/utils')(knex)
var CryptoJS = require('crypto-js')


router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('/login', function(req, res, next) {
  res.render('login', {message: 'Please enter your details:'})
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/logout'
}), function(req, res, next) {
  res.redirect('/user/' + req.body.username)
})

router.get('/user', function(req, res, next) {
  console.log('hi')
  res.render('profile')
})

router.post('/user', function(req, res, next) {
  var encryptedReq = req.body
  console.log('name: ', encryptedReq.username)
  encryptedReq.password = CryptoJS.AES.encrypt(encryptedReq.password.toString(), encryptedReq.username.toString())
  encryptedReq.password = encryptedReq.password.toString()
  console.log('password: ', encryptedReq.password)
  console.log('encrypted password: ', encryptedReq.password)
  db.addUser('users', encryptedReq, function(err, resp) {
    if(err) {
      console.error(err)
    } else {
      console.log(resp)
      res.redirect('/user/' + req.body.username)
      console.log('User added to the database')
    }
  })
})

router.get('/user/:username', function(req, res, next) {
  res.render('profile', { username: req.params.username })
})

router.get('/register', function(req, res, next) {
  res.render('register')
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
