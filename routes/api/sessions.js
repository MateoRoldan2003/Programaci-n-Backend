const express = require('express');
const passport = require('passport');
const router = express.Router();
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

router.get('/current', passport.authenticate('jwt', { session: false }), authorizationMiddleware.isUser, (req, res) => {
  const userDTO = {
  };
  res.json({ user: userDTO });
});

module.exports = router;