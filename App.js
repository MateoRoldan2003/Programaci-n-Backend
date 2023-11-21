// app.js

const express = require('express');
const ProductManager = require('./ProductManager'); // Ajusta la ruta según tu estructura de archivos

const app = express();
const port = 3000; // Puedes ajustar el puerto según tus necesidades
const productManager = new ProductManager('productos.json');

// Endpoint para obtener todos los productos o limitar por cantidad
app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getAllProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json({ products });
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
