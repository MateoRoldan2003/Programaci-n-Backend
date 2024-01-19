const express = require('express');
const userController = require('../controllers/userController');
const passport = require('../config/passport-config');

const router = express.Router();

router.get('/profile', passport.isAuthenticated, userController.profileController);

module.exports = router;
