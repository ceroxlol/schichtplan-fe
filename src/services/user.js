import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getCurrentUser() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + 'users/all', { headers: authHeader() });
  }

  getUser(id) {
    return axios.get(API_URL + 'users/' + id, { headers: authHeader() });
  }

  updateUser(user) {
    return axios.post(API_URL + 'users/' + user.id, user, { headers: authHeader() });
  }
}

const userService = new UserService();
export default userService;