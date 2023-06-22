import axios from "axios";
import { BACKEND_URL } from '../constants';

const url = `${BACKEND_URL}/users`;

class AuthService {
  async login(email, password) {
    try {
      return await axios
        .post(`${url}/login`, {
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
    const response = await axios.post(`${url}/register`, {
      username,
      email,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('Registered in successfully.')
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