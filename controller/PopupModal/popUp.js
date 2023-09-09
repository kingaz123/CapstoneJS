// Định nghĩa hàm hiện popup
const showPopup = (message) => {
  modalPopupBG.classList.add('active');
  modalPopup.classList.add('active');
  messagePopup.innerHTML = message;
};

// Định nghĩa hàm đóng popup
const closePopup = () => {
  modalPopupBG.classList.remove('active');
  modalPopup.classList.remove('active');
};

// Lấy các phần tử DOM
const modalPopupBG = document.querySelector('.message-container');
const modalPopup = document.querySelector('.popup-message');
const closePopupButton = document.querySelector('.close-popup');
const messagePopup = document.querySelector('.message-popup');

// Gắn sự kiện onclick cho closePopupButton
closePopupButton.onclick = closePopup;


