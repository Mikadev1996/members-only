const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/signup');
const signInRouter = require('./routes/signin');
const User = require('./models/user');


const myMongoDB = process.env.MONGODB_URI;
mongoose.connect(myMongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', () => { console.error.bind(console, 'MongoDB connection error') });

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({username: username}, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect Username"});

        bcrypt.compare(password, user.password, (err, res) => {
          if (res) return done(null, user);
          else return done(null, false, { message: "Incorrect Password"});
        })
      })
    })
)

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  })
})

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/sign-in', signInRouter);

module.exports = app;
