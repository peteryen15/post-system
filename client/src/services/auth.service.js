import axios from "axios";
const API_URL = "http://localhost:8080/api/account";

class AuthService {
  login() {}
  logout() {}
  register(name, email, password) {
    return axios.post(API_URL + "/register", {
      name,
      email,
      password,
    });
  }
}

export default new AuthService();
