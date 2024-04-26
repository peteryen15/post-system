import axios from "axios";
const API_URL = "https://post-system-api.onrender.com/api/account";

class AccountService {
  post(name, email, password) {
    return axios.post(API_URL + "/", {
      name,
      email,
      password,
    });
  }

  get(name) {
    return axios.get(API_URL + "/" + name);
  }
}

const accountServiceInstance = new AccountService();

export default accountServiceInstance;
