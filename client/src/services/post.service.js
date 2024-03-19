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

  get(title) {
    if (title) {
      return this.getByTitle(title);
    } else {
      return this.getAll();
    }
  }

  getAll() {
    const token = this.getToken();

    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  getByTitle(title) {
    const token = this.getToken();

    return axios.get(API_URL, {
      params: {
        title,
      },
      headers: {
        Authorization: token,
      },
    });
  }

  patch(_id, title, content) {
    const token = this.getToken();

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
    const token = this.getToken();

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new PostService();
