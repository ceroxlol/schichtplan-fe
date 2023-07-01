import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_GCP_BACKEND_URL : process.env.REACT_APP_LOCAL_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl + '/api'
})

export default axiosInstance;