import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.BACKEND_URL + "shifts" || 'http://localhost:8080/shifts';


class ShiftService {

  getAllShiftPlans() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getShiftPlan(userId) {
    return axios.get(API_URL + "/" + userId, { headers: authHeader() });
  }

  upsertShift(shift){
    return axios.post(API_URL, shift, {headers: authHeader()});
  }

  deleteShift(shiftId){
    return axios.delete(API_URL + "/" + shiftId, { headers: authHeader() });
  }
}

const shiftService = new ShiftService();
export default shiftService;