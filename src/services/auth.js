import axios from "axios";

const API_URL = "http://localhost:8080/users/";

class AuthService {
  async login(email, password) {
    const response = await axios
      .post(API_URL + "login", {
        email,
        password
      });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password) {
    const response = axios.post(API_URL + "register", {
      username,
      email,
      password
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();