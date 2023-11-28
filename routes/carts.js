const express = require('express');
const router = express.Router();
const fs = require('fs');

const carritoFilePath = './data/carrito.json';

router.post('/', (req, res) => {
  const newCart = {
    id: generateUniqueId(),
    products: []
  };
  const carritos = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));
  carritos.push(newCart);
  fs.writeFileSync(carritoFilePath, JSON.stringify(carritos, null, 2), 'utf-8');
  res.json(newCart);
});

router.get('/:cid', (req, res) => {
  const cid = req.params.cid;
  const carritos = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));
  const carrito = carritos.find(c => c.id === cid);
  res.json(carrito);
});

router.post('/:cid/product/:pid', (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;
  const carritos = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));
  const carrito = carritos.find(c => c.id === cid);

  if (carrito) {
    const existingProduct = carrito.products.find(p => p.id === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      carrito.products.push({ id: pid, quantity });
    }

    fs.writeFileSync(carritoFilePath, JSON.stringify(carritos, null, 2), 'utf-8');
    res.json(carrito);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = router;