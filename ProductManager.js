const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      return [];
    }
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }
}

module.exports = ProductManager;
