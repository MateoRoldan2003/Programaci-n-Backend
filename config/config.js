require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongodbURI: process.env.MONGODB_URI || 'mongodb://localhost/ecommerce',
  sessionSecret: process.env.SESSION_SECRET || 'd1b9bda1b4e2e817c631',
  jwtSecret: process.env.JWT_SECRET || 'd1b9bda1b4e2e817c631',
};