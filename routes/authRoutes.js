const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerController);

router.post('/login', authController.loginController);

router.get('/auth/github', authController.githubLoginController);
router.get('/auth/github/callback', authController.githubCallbackController);

module.exports = router;
