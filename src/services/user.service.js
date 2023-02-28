import axios from 'axios';
import authHeader from './auth-header';

const API_USERS_URL = 'http://localhost:8080/users/';
const API_USER_URL = 'http://localhost:8080/user/';


class UserService {
  getAll() {
    return axios.get(API_USERS_URL + 'all');
  }

  getCurrentUser(){
    return axios.get(API_USER_URL, {headers: authHeader()});
  }

  getUserManagement() {
    return axios.get(API_USER_URL + 'admin/usermanagement', { headers: authHeader() });
  }
}

export default new UserService();