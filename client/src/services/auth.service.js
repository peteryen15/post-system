import axios from "axios";
const API_URL = "https://post-system-api.onrender.com/api";

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
