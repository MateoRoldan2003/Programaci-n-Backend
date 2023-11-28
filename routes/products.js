const express = require('express');
const router = express.Router();
const fs = require('fs');

const productosFilePath = './data/productos.json';

// Ruta raíz GET /api/products
router.get('/', (req, res) => {
  const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
  res.json(productos);
});

router.get('/:pid', (req, res) => {
  const pid = req.params.pid;
  const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
  const producto = productos.find(p => p.id === pid);
  res.json(producto);
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
  newProduct.id = generateUniqueId();
  productos.push(newProduct);
  fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2), 'utf-8');
  res.json(newProduct);
});

router.put('/:pid', (req, res) => {
  const pid = req.params.pid;
  const updatedProduct = req.body;
  const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
  const index = productos.findIndex(p => p.id === pid);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...updatedProduct };
    fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2), 'utf-8');
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:pid', (req, res) => {
  const pid = req.params.pid;
  const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
  const updatedProductos = productos.filter(p => p.id !== pid);
  fs.writeFileSync(productosFilePath, JSON.stringify(updatedProductos, null, 2), 'utf-8');
  res.json({ success: true });
});

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = router;
