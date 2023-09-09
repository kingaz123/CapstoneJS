class UserRegister {
  constructor(email, password, name, gender, phone) {
    this.email = email || "";
    this.password = password || "";
    this.name = name || "";
    this.gender = gender || true;
    this.phone = phone || "";
  }
}
