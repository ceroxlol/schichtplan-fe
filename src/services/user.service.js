import axios from 'axios';
import authHeader from './auth-header';

const API_USERS_URL = 'http://localhost:8080/users/';
const API_USER_URL = 'http://localhost:8080/user/';
const API_BASE_URL = 'http://localhost:8080/';


class UserService {
  getAll() {
    return axios.get(API_USERS_URL + 'all');
  }

  getCurrentUser(){
    return axios.get(API_USER_URL, {headers: authHeader()});
  }

  getShiftPlan() {
    return axios.get(API_BASE_URL + 'shiftplan', { headers: authHeader() });
  }

  getUserManagement() {
    return axios.get(API_USER_URL + 'admin/usermanagement', { headers: authHeader() });
  }
}

export default new UserService();