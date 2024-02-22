const express = require('express');
const router = express.Router();
const productsController = require('../../../controllers/productsController');
const ProductFactory = require('../../../data/factory');
const ProductDAO = require('../../../data/dao');
const ProductDTO = require('../../../data/dto');

const productFactory = new ProductFactory();
const productDAO = new ProductDAO();

router.get('/', productsController.getAllProducts);
router.post('/', (req, res) => {
  const productDTO = productFactory.createProductDTO(req.body);
  productsController.createProduct(productDTO, productDAO, res);
});

module.exports = router;