//function ấn chọn radio button này thì bỏ chon radio button khác, để tiện hổ trợ style riêng cho các radio button phần chọn giới tính.
function genderCheckBox(element) {
    var checkBox = document.querySelectorAll(".specialCheckBox input");
    checkBox.forEach(function (item) {
        item.checked = false;
    });
    element.querySelector("input").checked = true;
}
const registerButton = document.querySelector('.RegFormButton button')
//Validation
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

function showErr(id, message) {
    getEle(id).innerText = message;
}

function checkValidEmail() {
    var email = getEle("email").value;
    return validation.checkRong(email, "emailError") && validation.emailCheck(email, "emailError", "Email không đúng định dạng");
}

function checkValidName() {
    var name = getEle("name").value;
    return validation.checkRong(name, "nameError") && validation.nameCheck(name, "nameError", "Họ tên phải là ký tự chữ (không được bao gồm số hay ký tự đặc biệt)");
}

function checkValidPassword() {
    var password = getEle("password").value;
    return validation.checkRong(password, "passwordError") && validation.passwordCheck(password, "passwordError", "Mật khẩu phải từ 5-15 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");
}

function checkValidConfirmPassword() {
    var password = getEle("password").value;
    var passwordConfirm = getEle("confirm").value;
    if (password === passwordConfirm) {
        getEle("confirmError").innerText = "";
        return true;
    } else {
        showErr("confirmError", "(*) Password nhập lại không đúng!");
        return false;
    }
}

function checkValidPhone() {
    var phone = getEle("phone").value;
    return validation.checkRong(phone, "phoneError") && validation.phoneCheck(phone, "phoneError", "Số điện thoại là phải là dãy số gồm 10 chữ số");
}

function getInfo() {
    var emailValid = checkValidEmail();
    var nameValid = checkValidName();
    var passwordValid = checkValidPassword();
    var confirmPasswordValid = checkValidConfirmPassword();
    var phoneValid = checkValidPhone();
    var isValid = emailValid && nameValid && passwordValid && confirmPasswordValid && phoneValid;

    if (isValid) {
        var userRegister = new UserRegister(
            getEle("email").value,
            getEle("password").value,
            getEle("name").value,
            document.querySelector(".specialCheckBox input").checked,
            getEle("phone").value
        );
    }
    return userRegister
}

// Kiểm tra tính hợp lệ của từng trường ngay khi đang nhập.
document.getElementById("email").onkeyup = checkValidEmail;
document.getElementById("name").onkeyup = checkValidName;
document.getElementById("password").onkeyup = checkValidPassword;
document.getElementById("confirm").onkeyup = checkValidConfirmPassword;
document.getElementById("phone").onkeyup = checkValidPhone;

// Gắn sự kiện click cho nút đăng ký
registerButton.addEventListener("click", function (event) {
    var user = getInfo();
    var promise = axios({
        url: "https://shop.cyberlearn.vn/api/Users/signup",
        method: "POST",
        data: user
    });
    promise.then(function (result) {
        showPopup(result.data.message)
    });
    promise.catch(function (err) {
        showPopup(err.response.data.message);
    });
    event.preventDefault();
});;
