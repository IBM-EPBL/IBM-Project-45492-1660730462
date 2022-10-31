import { runInAction } from "mobx";
import { clearUserRegistrationDataFromLocalStorage, fetchUserDataFromLocalStorage } from "../../helpers";
import axiosClient from "../../helpers/Axios";
import mainstore from "../store";
import * as EndPoints from "./EndPoints";

class ApiRequestsModal {
    constructor() {
        fetchUserDataFromLocalStorage()
    }

    login = (data, callback) => {
        axiosClient
            .post(EndPoints.login, data)
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data.user))
                localStorage.setItem("token", JSON.stringify(res.data.token))
                runInAction(() => {
                    const {name, email, mobile, id} = res.data.user
                    mainstore.userInfo = {
                        name,
                        email,
                        mobile,
                        token: res.data.token,
                        userId: id
                    }
                })
                callback(res, true);
            })
            .catch((err) => {
                callback(err, false);
            });
    };

    register = (data, callback) => {
        axiosClient
            .post(EndPoints.register, data)
            .then((res) => {
                const otpToken = res.data.token;
                localStorage.setItem("otpToken", otpToken);
                runInAction(() => {
                    mainstore.userRegistration.otpToken = otpToken;
                });
                callback(res, true);
            })
            .catch((err) => {
                callback(err, false);
            });
    };

    validateOtp = (data, callback) => {
        const payload = {
            ...data,
            token: mainstore.userRegistration.otpToken
        }
        axiosClient.post(EndPoints.validateOtp, payload).then((res) => {
            clearUserRegistrationDataFromLocalStorage(); 
            runInAction(()=> {
                mainstore.userRegistration.otpToken = ''
            })
            callback(res, true)
        }).catch(err => {
            callback(err, false)
        })
    }

}

const apiModal = new ApiRequestsModal();
export default apiModal;
