import axiosInstance from '../utils/axios';

class AuthService {
  async login(email, password) {
    console.log('url: %s', axiosInstance.getUri())
    try {
      return await axiosInstance.post("/users/login", {
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
    await axiosInstance.post("/users/register", {
      username,
      email,
      password
    })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log('Registered successfully.')
          return response.data;
        }
      })
      .catch(console.log);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

const authService = new AuthService();
export default authService;