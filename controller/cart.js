let dssp = new ProductList();

function renderLocalStorage() {
  if (localStorage.getItem("DSSP") != null) {
    // Lấy dữ liệu từ localStorage và gán cho đối tượng dssp
    const localStorageData = JSON.parse(localStorage.getItem("DSSP"));
    dssp.products = localStorageData;
    renderdssp(dssp.products, ".cart__list-item");
    renderTotalCart(dssp.products, ".total-cart");
  }
}

function renderdssp(dssp, selector) {
  if (!dssp.length) {
    document.querySelector(
      selector
    ).innerHTML = `<p class="empty-cart">Empty Cart</p>`
    return
  }
  let htmlString = ''
  dssp.forEach((item) => {
    htmlString += `
        <div class="cart__item">
          <div class="cart__item-content-left">
            <div class="cart__item-product-pic">
              <img src="${item.image}" alt="" />
            </div>
            <div class="cart__item-product-description">
              <p class="name">${item.name}</p>
              <p class="price">$ ${item.price}</p>
            </div>
          </div>
          <div class="cart__item-content-right">
            <div class="cart__item-button">
              <button class="btn-reduce" onclick="renderDecrease(${item.id})">
                <i class="fa fa-arrow-left"></i>
              </button>
              <span class="quantity">${item.quantity}</span >
              <button class="btn-increase" onclick="renderIncrease(${item.id})">
                <i class="fa fa-arrow-right"></i>
              </button>
              <button class="delete-cart-item" onclick="deleteProduct(${item.id})"><i class="fa-solid fa-trash"></i></button>
            </div >
      <div class="cart__item-total">
        <p>$ <span class="total-price-item">${item.totalPrice}</span></p>
      </div>
          </div >
        </div >
      `
  })
  document.querySelector(selector).innerHTML = htmlString
}
//Function tính tổng tiền tất cả món hàng có trong giỏ và in ra giao diện:
function renderTotalCart(dssp, selector) {
  const totalCart = dssp.reduce(
    (output, element) => output + element.quantity * element.price,
    0
  );

  const totalCartFormatted = totalCart.toLocaleString();
  document.querySelector(selector).innerHTML = totalCartFormatted;

  if (dssp.length === 0) {
    document.querySelector(selector).innerHTML = '0';
  }
  totalCartItems() //Cập nhật tổng số lượng đơn vị hàng hóa
}


renderLocalStorage();
// -----------------------------------------
function deleteProduct(id) {
  dssp.eraseProduct(id);

  setLocalStorage();

  renderLocalStorage();
}

function recalculateTotalPrice(product) {
  product.totalPrice = product.price * product.quantity;
}

function renderIncrease(id) {
  const productIndex = dssp.products.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    dssp.increaseProduct(id);
    recalculateTotalPrice(dssp.products[productIndex]);
    setLocalStorage();
    renderLocalStorage();
  }
}

function renderDecrease(id) {
  const productIndex = dssp.products.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    dssp.decreaseProduct(id);
    recalculateTotalPrice(dssp.products[productIndex]);
    setLocalStorage();
    renderLocalStorage();
  }
}

function totalCartItems() {
  let number = 0;
  dssp.products.map(function (sp) {
    number += Number(sp.quantity)
  })
  document.querySelector(".total-items").innerHTML = number;
}

totalCartItems()