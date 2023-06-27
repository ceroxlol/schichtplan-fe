import axiosInstance from '../utils/axios';
import authHeader from './auth-header';

class ShiftService {

  getAllShiftPlans() {
    return axiosInstance.get(`/shifts`, { headers: authHeader() });
  }

  getShiftPlan(userId) {
    return axiosInstance.get(`/shifts/${userId}`, { headers: authHeader() });
  }

  upsertShift(shift){
    return axiosInstance.post(`/shifts`, shift, {headers: authHeader()});
  }

  deleteShift(shiftId){
    return axiosInstance.delete(`/shifts/${shiftId}`, { headers: authHeader() });
  }
}

const shiftService = new ShiftService();
export default shiftService;