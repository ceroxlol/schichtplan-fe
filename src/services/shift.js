import axios from 'axios';
import authHeader from './auth-header';
import { BACKEND_URL } from '../constants';

const url = `${BACKEND_URL}/shifts`;

class ShiftService {

  getAllShiftPlans() {
    return axios.get(url, { headers: authHeader() });
  }

  getShiftPlan(userId) {
    return axios.get(`${url}/${userId}`, { headers: authHeader() });
  }

  upsertShift(shift){
    return axios.post(url, shift, {headers: authHeader()});
  }

  deleteShift(shiftId){
    return axios.delete(`${url}/${shiftId}`, { headers: authHeader() });
  }
}

const shiftService = new ShiftService();
export default shiftService;