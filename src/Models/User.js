class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  getUserInfo() {
    return `User ${this.username}, Email: ${this.email}`;
  }
}

export default User;
