const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.delete('/carts/:cid/products/:pid', cartController.deleteProductFromCart);

module.exports = router;