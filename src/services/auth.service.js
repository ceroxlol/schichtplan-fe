import axios from "axios";

const API_URL = "http://localhost:8080/users/";

class AuthService {
  async login(username, password) {
    const response = await axios
          .post(API_URL + "login", {
              username,
              password
          });
      if (response.data.user.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();