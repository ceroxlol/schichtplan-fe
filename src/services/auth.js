import axios from "axios";

const API_URL = "http://localhost:8080/users/";

class AuthService {
  async login(email, password) {
    try {
      return await axios
        .post(API_URL + "login", {
          email: email,
          password: password
        });
    } catch (message) {
      return console.log(message);
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password) {
    const response = await axios.post(API_URL + "register", {
      username,
      email,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Registered in successfully.")
      }
    })
    .catch(console.log);
    return response.data;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

const authService = new AuthService();
export default authService;