import axios from "axios";
const API_URL = "http://localhost:8080/api/post";

class PostService {
  get() {
    const token = JSON.parse(localStorage.getItem("user")).token;

    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  patch(_id, title, content) {
    const token = JSON.parse(localStorage.getItem("user")).token;

    return axios.patch(
      API_URL,
      { _id, title, content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  delete(_id) {
    const token = JSON.parse(localStorage.getItem("user")).token;

    return axios.delete(API_URL, {
      data: { _id },
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new PostService();
