function getProductList() {
  var promiseObj = axios({
    method: 'get',
    url: 'https://shop.cyberlearn.vn/api/Product'
  });

  promiseObj.then(function (result) {
    showProductList(result.data.content);
  });

  promiseObj.catch(function (error) {
    console.log(error);
  });
}

function showProductList(products) {
  var featureContainer = document.querySelector(".featureContainer");
  var productsHtml = "";

  products.forEach(function (item) {
    productsHtml += `<div class="featureItem">
      <div class="itemInner card">
        <a href="./view/detail.html?productid=${item.id}">
          <div class="card-img">
            <img src=${item.image} alt="" />
          </div>
          <div class="card-name">
            <h4>${item.name}</h4>
          </div>
          <div class="card-description">
            <p>${item.shortDescription}</p>
          </div>
          <div class="card-button">
            <p>$ ${item.price}</p>
            <button class="button btn-primary-dark">Chi tiết</button>
          </div>
          </a>
      </div>
      </div>`;
  });

  featureContainer.innerHTML = productsHtml;
}

getProductList();

function getProductByCategory() {
  let brand = document.querySelector("#brand").value;

  if (brand === "1") {
    // Nếu "Chọn hãng giày" được chọn, hiển thị tất cả sản phẩm
    getProductList();
  } else {
    axios({
      method: 'get',
      url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${brand}`
    })
      .then((result) => {
        let products = result.data.content;
        showProductList(products);
      })
      .catch((error) => {
        showPopup(error);
      });
  }
}
