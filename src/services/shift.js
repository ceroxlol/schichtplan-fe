import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8080/shifts';


class ShiftService {

  getAllShiftPlans() {
    return axios.get(API_BASE_URL, { headers: authHeader() }).then((response) => console.log(response));
  }

  getShiftPlan(userId) {
    return axios.get(API_BASE_URL + "/" + userId, { headers: authHeader() });
  }
}

export default new ShiftService();