const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;
const productManager = new ProductManager('productos.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getAllProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json({ products });
});

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
