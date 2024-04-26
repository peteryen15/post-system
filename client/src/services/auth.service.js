import axios from "axios";
const API_URL = "http://localhost:8080/api";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
