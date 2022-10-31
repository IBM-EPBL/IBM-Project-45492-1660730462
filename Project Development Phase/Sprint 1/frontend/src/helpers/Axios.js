import axios from "axios";

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://localhost:4000/';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
};

export default axiosClient;