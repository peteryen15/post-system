import axios from "axios";
const API_URL = "http://localhost:8080/api/posts";

class PostService {
  getToken() {
    return JSON.parse(localStorage.getItem("user")).token;
  }

  post(title, content) {
    const token = this.getToken();

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

  get(author, title) {
    return axios.get(API_URL, {
      params: {
        author,
        title,
      },
    });
  }

  patch(_id, title, content) {
    const token = this.getToken();
    const updatedAt = new Date().toISOString();

    return axios.patch(
      API_URL + "/" + _id,
      { title, content, updatedAt },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  delete(_id) {
    const token = this.getToken();

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

const postServiceInstance = new PostService();

export default postServiceInstance;
