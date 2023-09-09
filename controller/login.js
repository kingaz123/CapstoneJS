const loginButton = document.querySelector('#loginButton');
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function showErr(id, message) {
  getEle(id).innerText = message;
}

function checkValidEmail() {
  const email = document.getElementById("loginEmail").value;
  return validation.checkRong(email, "loginEmailError") && validation.emailCheck(email, "loginEmailError", "Email không đúng định dạng");
}

function checkValidPassword() {
  const password = document.getElementById("loginPassword").value;
  return validation.checkRong(password, "loginPasswordError");
}

function getInfo() {
  const emailValid = checkValidEmail();
  const passwordValid = checkValidPassword();
  const isValid = emailValid && passwordValid;

  if (isValid) {
    const userLogin = new UserLogin(
      document.getElementById("loginEmail").value,
      document.getElementById("loginPassword").value
    );
    return userLogin;
  }

  return null;
}

// Kiểm tra tính hợp lệ của từng trường ngay khi đang nhập.
document.getElementById("loginEmail").onkeyup = checkValidEmail;
document.getElementById("loginPassword").onkeyup = checkValidPassword;
// Gắn sự kiện click cho nút đăng nhập
loginButton.addEventListener("click", function (event) {
  const user = getInfo();
  if (user) {
    const promise = axios({
      url: "https://shop.cyberlearn.vn/api/Users/signin",
      method: "POST",
      data: user
    });
    promise.then(function (result) {
      const accessToken = result.data.content.accessToken;
      const email = result.data.content.email;
      localStorage.setItem("accessToken", accessToken); // Lưu access token vào Local Storage
      localStorage.setItem("email", email); // Lưu email vào Local Storage
      // Tự động chuyển hướng về trang chủ khi đăng nhập thành công
      window.location.href = "../index.html"
      //  Ẩn nút đăng nhập và đăng ký, và Hiển thị email và nút đăng xuất 
      document.querySelectorAll(".topHeaderLink button").forEach(button => {
        button.style.display = "none";
      });
      document.getElementById("userEmail").style.display = "inline";
      document.getElementById("userEmail").textContent = email;
      document.getElementById("logoutButton").style.display = "block";
    });
    promise.catch(function (err) {
      showPopup(err.response.data.message);
    });
  }
  event.preventDefault();
});
