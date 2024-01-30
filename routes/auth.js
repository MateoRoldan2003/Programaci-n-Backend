const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/login-jwt', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = generateJwtToken(req.user);
  res.json({ token });
});

function generateJwtToken(user) {
}

module.exports = router;