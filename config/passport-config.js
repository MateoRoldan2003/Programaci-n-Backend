const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();

app.use(require('express-session')({ secret: 'tu_secreto', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GitHubStrategy({
    clientID: 'tu_client_id',
    clientSecret: 'tu_client_secret',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

const saltRounds = 10;