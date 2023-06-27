import axiosInstance from '../utils/axios';

class AuthService {
  async login(email, password) {
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
    const response = await axiosInstance.post("/users/register", {
      username,
      email,
      password
    })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log('Registered successfully.')
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