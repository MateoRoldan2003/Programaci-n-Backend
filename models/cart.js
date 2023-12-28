const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // Otras propiedades del carrito
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;