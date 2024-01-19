// controllers/authController.js

const passport = require('../config/passport-config');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Controlador para el registro
const registerController = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await user.save();
        res.send('Usuario registrado con éxito.');
    } catch (error) {
        res.status(500).send('Error en el registro.');
    }
};

// Ruta para el login con Passport
const loginController = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

// Ruta para el login con GitHub
const githubLoginController = passport.authenticate('github', { scope: ['user:email'] });

const githubCallbackController = passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
});

module.exports = {
    registerController,
    loginController,
    githubLoginController,
    githubCallbackController
};
  