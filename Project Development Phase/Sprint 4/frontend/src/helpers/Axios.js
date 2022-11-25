import axios from "axios";
import { BASE_URL } from "../Modals/Api/EndPoints";
import mainstore from "../Modals/store";

const axiosClient = axios.create()

axiosClient.defaults.baseURL = BASE_URL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
};

axiosClient.interceptors.request.use((config)=> {
    if(mainstore.userInfo.token){
        console.log("Axios : Token Exists")
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${mainstore.userInfo.token}`
        };
    }
    return config
})



export default axiosClient;