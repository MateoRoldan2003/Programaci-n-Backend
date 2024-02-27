const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const config = require('../config');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromCookie(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
}));

