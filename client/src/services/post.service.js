import axios from "axios";
const API_URL = "http://localhost:8080/api";

class PostService {
  get() {
    const token = JSON.parse(localStorage.getItem("user")).token;

    return axios.get(API_URL + "/post", {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new PostService();
