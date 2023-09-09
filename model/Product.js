class Product {
  constructor(id, name, image, price, quantity) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.totalPrice = this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    return this.price * this.quantity;
  }
}