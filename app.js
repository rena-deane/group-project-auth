var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var passport = require('passport')
var session = require('express-session')
var router = express.Router()

var routes = require('./routes/index')
var setupPassport = require('./passportSetup')
var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'supersecretpassword123' }))
app.use(passport.initialize())
app.use(passport.session())
setupPassport()

app.use('/', routes)

module.exports = app
