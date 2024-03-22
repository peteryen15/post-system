import axios from "axios";
const API_URL = "http://localhost:8080/api/account";

class AccountService {
  get(name) {
    return axios.get(API_URL + "/" + name);
  }
}

export default new AccountService();
