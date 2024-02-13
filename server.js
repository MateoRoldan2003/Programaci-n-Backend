const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./config');
const passportMiddleware = require('./middlewares/passportMiddleware');

const app = express();

mongoose.connect(config.mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passportMiddleware.initialize());

const authRoutes = require('./routes/auth');
const sessionsRoutes = require('./routes/api/sessions');
const productsRoutes = require('./routes/api/products');

app.use('/auth', authRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/products', productsRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
