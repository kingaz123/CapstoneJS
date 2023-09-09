// Gọi API
function CallProductById(id) {
  return axios({
    method: 'get',
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`
  })
}

//Render thông tin sản phẩm ra giao diện:
function renderDetailProduct(product) {
  let htmlCode = `
    <div class="detail__product-img">
      <img src=${product.image} alt="">
    </div>
    <div class="detail__product-description">
      <div class="detail__title">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Giá: <span class="total-price">${product.price} USD</span></p>
        <div class="detail__shoe-size">Kích thước: <span class="shoe-size">${product.size[0]}</span></div>
      </div>
      <div class="detail__size">
        <button onclick="chooseSize(${product.size[0]}, event)" class="button-size active">${product.size[0]}</button>
        <button onclick="chooseSize(${product.size[1]}, event)" class="button-size">${product.size[1]}</button>
        <button onclick="chooseSize(${product.size[2]}, event)" class="button-size">${product.size[2]}</button>
        <button onclick="chooseSize(${product.size[3]}, event)" class="button-size">${product.size[3]}</button>
        <button onclick="chooseSize(${product.size[4]}, event)" class="button-size">${product.size[4]}</button>
        <button onclick="chooseSize(${product.size[5]}, event)" class="button-size">${product.size[5]}</button>
        <button onclick="chooseSize(${product.size[6]}, event)" class="button-size">${product.size[6]}</button>
      </div>
      <div class="detail__button-quantity">
        <button class="btn-reduce" onclick="decreaseQuantity()">
          <i class="fa fa-arrow-left"></i>
        </button>
        <span class="total-quantity">1</span>
        <button class="btn-increase" onclick="increaseQuantity()">
          <i class="fa fa-arrow-right"></i>
        </button>
      </div>
      <div class="detail__button">
        <button onclick="addToCart(${product.id})" class="btn-detail">Thêm vào giỏ hàng</button>
      </div>
    </div>`
  return htmlCode
}

const chooseSize = (size, event) => {
  //Gán kích thước được chọn vào phần thông tin kích thước
  document.querySelector(".shoe-size").innerHTML = size;
  // Lấy danh sách tất cả các nút size
  const sizeButtons = document.querySelectorAll(".button-size");

  // Lặp qua danh sách và bỏ class active từ tất cả các nút
  sizeButtons.forEach(button => {
    button.classList.remove("active");
  });

  // Thêm class active cho nút được click
  event.currentTarget.classList.add("active");
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('productid')
  function getProductByID(id) {
    CallProductById(id).then(function (result) {
      document.querySelector(".detail .detail__product").innerHTML = renderDetailProduct(result.data.content)
    }).catch(function (error) {
      console.log(error);
    })
  }

  getProductByID(myParam)
}
let dssp = new ProductList()
// Hàm totalItems ở file totalItems.js đang được sử dụng ở nhiều trang trong dự án với biến cart cho hàm (vì nếu khai báo biến dssp để dùng cho hàm thì file details.js này sẽ báo lỗi biến dssp đã được khai báo rồi). Tuy nhiên, khi thêm 1 hoặc nhiều sản phẩm mới vào giỏ hàng, để tiện cho việc sử dụng biến dssp của file detail.js để render tổng số lượng sản phẩm vào bên cạnh biểu tượng giỏ hàng ở trên cùng trang ngay lúc bấm nút "Thêm vào giỏ hàng" (mà khônng cần phải load lại trang) thì tạo lại 1 hàm totalItems mới với code tương tự:
function totalItems1() {
  let number = 0;
  dssp.products.map(function (sp) {
    number += Number(sp.quantity)
  })
  document.querySelector(".cart__number").innerHTML = number;
}

function addToCart(id) {
  var quantity = document.querySelector(".total-quantity").innerHTML;
  CallProductById(id).then((result) => {
    let product = result.data.content;
    let newProduct = new Product(product.id, product.name, product.image, product.price, quantity);

    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
      if (dssp.products.length < 0) {
        dssp.addProduct(newProduct);
        showPopup("Thêm sản phẩm thành công")
        setLocalStorage();
        totalItems1();
      } else {
        let addedProduct = dssp.products.find(function (sp) {
          return sp.id == product.id
        });

        if (addedProduct) {
          let quantityUpdate = Number(addedProduct.quantity) + Number(quantity);
          let spUpdate = new Product(product.id, product.name, product.image, product.price, quantityUpdate);

          dssp.updateQuantity(spUpdate);
          showPopup("Thêm sản phẩm thành công");
          setLocalStorage();
          totalItems1();
        } else {
          dssp.addProduct(newProduct);
          showPopup("Thêm sản phẩm thành công");
          setLocalStorage();
          totalItems1();
        }
      }
    } else {
      showPopup("Vui lòng đăng nhập để mua sản phẩm")
    }
  }).catch(function (error) {
    showPopup(error);
  })
}
getLocalStorage()

function increaseQuantity() {
  let quantity = Number(document.querySelector(".total-quantity").innerHTML)
  let increasedQuantity = quantity += 1;
  document.querySelector(".total-quantity").innerHTML = increasedQuantity
}
function decreaseQuantity() {
  let decreasedQuantity = 0;
  let quantity = Number(document.querySelector(".total-quantity").innerHTML)
  if (quantity > 1) {
    decreasedQuantity = quantity -= 1;
  } else {
    quantity = 1;
  }

  document.querySelector(".total-quantity").innerHTML = decreasedQuantity
}