import axiosInstance from '../utils/axios';
import authHeader from './auth-header';

class UserService {
  getPublicContent() {
    return axiosInstance.get(`/all`);
  }

  getCurrentUser() {
    return axiosInstance.get(`/user`, { headers: authHeader() });
  }

  getAllUsers() {
    return axiosInstance.get(`/users/all`, { headers: authHeader() });
  }

  getUser(id) {
    return axiosInstance.get(`/users/${id}`, { headers: authHeader() });
  }

  updateUser(user) {
    return axiosInstance.post(`/users/${user.id}`, user, { headers: authHeader() });
  }
}

const userService = new UserService();
export default userService;