const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const productoSchema = new mongoose.Schema({
  // Definición de propiedades de tu esquema de producto
});

productoSchema.plugin(paginate);
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;