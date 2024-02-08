const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./config');

const app = express();

mongoose.connect(config.mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
const sessionsRoutes = require('./routes/api/sessions');
app.use('/auth', authRoutes);
app.use('/api/sessions', sessionsRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});