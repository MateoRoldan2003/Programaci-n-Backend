const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'd1b9bda1b4e2e817c631', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
const sessionsRoutes = require('./routes/api/sessions');
app.use('/auth', authRoutes);
app.use('/api/sessions', sessionsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

