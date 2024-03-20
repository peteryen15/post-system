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

  get(name, title) {
    if (!title) {
      if (!name) {
        return this.getAll();
      } else {
        return this.getByName(name);
      }
    } else {
      if (!name) {
        return this.getByTitle(title);
      } else {
        return this.getByTitleAndName(name, title);
      }
    }
  }

  getAll() {
    return axios.get(API_URL);
  }

  getByName(name) {
    return axios.get(API_URL + "/" + name);
  }

  getByTitle(title) {
    return axios.get(API_URL, {
      params: {
        title,
      },
    });
  }

  getByTitleAndName(name, title) {
    return axios.get(API_URL + "/" + name, {
      params: {
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
