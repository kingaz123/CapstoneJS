// Kiểm tra xem có access token trong Local Storage hay không
function checkLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    // Nếu có access token, chứng tỏ người dùng đã đăng nhập --> Ẩn nút đăng nhập và đăng ký, rồi hiển thị nút đăng xuất và email.
    document.querySelectorAll(".topHeaderLink button").forEach(button => {
      button.style.display = "none";
    })
    document.getElementById("userEmail").style.display = "inline";
    document.getElementById("userEmail").textContent = localStorage.getItem("email");
    document.getElementById("logoutButton").style.display = "block";
    document.querySelector(".cartInfo").style.display = "block"
  } else {
    ;
    // Nếu không có access token,  có nghĩa là người dùng chưa đăng nhập --> Ẩn nút đăng xuất và email, rồi hiển thị nút đăng nhập và đăng ký
    document.querySelectorAll(".topHeaderLink button").forEach(button => {
      button.style.display = "block";
      document.getElementById("logoutButton").style.display = "none";
      document.querySelector(".cartInfo").style.display = "none";
    });
  }
}

// Xử lý sự kiện khi nút đăng xuất được nhấn
function logOut() {
  localStorage.removeItem("accessToken");
  if (localStorage.getItem("accessToken") == null) {
    showPopup("Bạn đã đăng xuất thành công");
    // Ẩn nút đăng xuất và hiển thị nút đăng nhập và đăng ký, ẩn email và nút đăng xuất
    document.querySelectorAll(".topHeaderLink button").forEach(button => {
      button.style.display = "block";
      document.getElementById("userEmail").style.display = "none";
      document.getElementById("logoutButton").style.display = "none";
      document.querySelector(".cartInfo").style.display = "none";
    });
  }
}

// Gọi hàm kiểm tra đăng nhập khi trang web được tải
window.addEventListener("DOMContentLoaded", checkLoggedIn);
