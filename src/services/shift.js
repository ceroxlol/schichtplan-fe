import authHeader from './auth-header';

class ShiftService {

  getAllShiftPlans() {
    return axios.get(`/api/shifts`, { headers: authHeader() });
  }

  getShiftPlan(userId) {
    return axios.get(`/api/shifts/${userId}`, { headers: authHeader() });
  }

  upsertShift(shift){
    return axios.post(`/api/shifts`, shift, {headers: authHeader()});
  }

  deleteShift(shiftId){
    return axios.delete(`/api/shifts/${shiftId}`, { headers: authHeader() });
  }
}

const shiftService = new ShiftService();
export default shiftService;