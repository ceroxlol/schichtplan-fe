import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getPublicContent() {
    return axios.get(`/api/all`);
  }

  getCurrentUser() {
    return axios.get(`/api/user`, { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(`/api/users/all`, { headers: authHeader() });
  }

  getUser(id) {
    return axios.get(`/api/users/${id}`, { headers: authHeader() });
  }

  updateUser(user) {
    return axios.post(`/api/users/${user.id}`, user, { headers: authHeader() });
  }
}

const userService = new UserService();
export default userService;