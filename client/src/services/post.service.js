import axios from "axios";
const API_URL = "http://localhost:8080/api/posts";

class PostService {
  post(title, content) {
    const token = JSON.parse(localStorage.getItem("user")).token;

    return axios.post(
      API_URL,
      { title, content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

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
      API_URL + "/" + _id,
      { title, content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  delete(_id) {
    const token = JSON.parse(localStorage.getItem("user")).token;

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new PostService();
