import axios from 'axios';
import authHeader from './auth-header';
import { BACKEND_URL } from '../constants';

const url = `${BACKEND_URL}`;

class UserService {
  getPublicContent() {
    return axios.get(`${url}/all`);
  }

  getCurrentUser() {
    return axios.get(`${url}/user`, { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(`${url}/users/all`, { headers: authHeader() });
  }

  getUser(id) {
    return axios.get(`${url}/users/${id}`, { headers: authHeader() });
  }

  updateUser(user) {
    return axios.post(`${url}/users/${user.id}`, user, { headers: authHeader() });
  }
}

const userService = new UserService();
export default userService;