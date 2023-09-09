function Validation() {
    this.checkRong = function (value, id) {
        if (value.trim() != "") {
            return true;
        }
        showErr(id, "Vui lòng điền dữ liệu vào trường");
        return false; //có rỗng
    }
    //! Check email đúng định dạng
    this.emailCheck = function (email, id, message) {
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(reg)) {
            getEle(id).innerText = "";
            return true;
        }
        showErr(id, message);
        return false;
    }
    //! Check tên phải là ký tự chữ
    this.nameCheck = function (name, id, message) {
        var reg = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (name.match(reg)) {
            getEle(id).innerText = "";
            return true;
        }
        showErr(id, message);
        return false;
    }
    //! Check password có từ 5-15 ký tự  (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)
    this.passwordCheck = function (password, id, message) {
        var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;
        if (password.match(reg)) {
            getEle(id).innerText = "";
            return true;
        }
        showErr(id, message);
        return false;
    }
    //!Check số điện thoại phải là dãy số gồm 10 chữ số liên tiếp (1 chữ số = 1 số tự nhiên có 1 chữ số - từ 0 -> 9)
    this.phoneCheck = function (phone, id, message) {
        var reg = /^\d{10}$/;
        if (phone.match(reg)) {
            getEle(id).innerText = "";
            return true;
        }
        showErr(id, message);
        return false;
    }
}