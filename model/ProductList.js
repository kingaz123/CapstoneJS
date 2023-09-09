class ProductList {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  updateQuantity(updatedProduct) {
    const indexUpdate = this.products.findIndex(product => product.id === updatedProduct.id);
    if (indexUpdate > -1) {
      this.products[indexUpdate] = updatedProduct;
    }
  }

  eraseProduct(deleteID) {
    const indexDelete = this.products.findIndex(product => product.id === deleteID);
    if (indexDelete > -1) {
      this.products.splice(indexDelete, 1);
    }
  }

  increaseProduct(id) {
    const indexChange = this.products.find(product => product.id === id);
    if (indexChange) {
      indexChange.quantity++;
      this.products[this.products.indexOf(indexChange)] = indexChange;
    }
  }

  decreaseProduct(id) {
    const indexChange = this.products.find(product => product.id === id);
    if (indexChange && indexChange.quantity > 1) {
      indexChange.quantity--;
      this.products[this.products.indexOf(indexChange)] = indexChange;
    }
  }
}
