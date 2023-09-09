//Function hiển tổng số lượng những món hàng đã cho vào giỏ ở bên cạnh biểu tượng giỏ hàng góc trên bên phải màn hình (cộng số lượng từng sản phẩm lại với nhau = tổng số lượng món hàng)
let cart = new ProductList();
cart.products = JSON.parse(localStorage.getItem("DSSP"))
function totalItems() {
  let number = 0;
  cart.products.map(function (sp) {
    number += Number(sp.quantity)
  })
  document.querySelector(".cart__number").innerHTML = number;
}

totalItems()