const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport-config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

mongoose.connect('http//', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'tu_secreto', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
