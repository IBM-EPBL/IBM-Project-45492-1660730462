import { runInAction } from "mobx";
import { clearUserRegistrationDataFromLocalStorage, fetchUserDataFromLocalStorage } from "../../helpers";
import axiosClient from "../../helpers/Axios";
import mainstore from "../store";
import * as EndPoints from "./EndPoints";
import FormData from "form-data";

class ApiRequestsModal {
    constructor() {
        fetchUserDataFromLocalStorage();
        this.getMetadata();
    }

    login = (data, callback) => {
        axiosClient
            .post(EndPoints.login, data)
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data.user))
                localStorage.setItem("token", res.data.token)
                runInAction(() => {
                    const { name, email, mobile, id } = res.data.user;
                    mainstore.userInfo = {
                        name,
                        email,
                        mobile,
                        token: res.data.token,
                        userId: id,
                    };
                });
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
            token: mainstore.userRegistration.otpToken,
        };
        axiosClient
            .post(EndPoints.validateOtp, payload)
            .then((res) => {
                clearUserRegistrationDataFromLocalStorage();
                runInAction(() => {
                    mainstore.userRegistration.otpToken = "";
                });
                callback(res, true);
            })
            .catch((err) => {
                callback(err, false);
            });
    };

    singleSamplePrediction = (data, callback) => {
        axiosClient
            .post(EndPoints.singleSamplePrediction, data)
            .then((res) => {
                callback(res, true);
            })
            .catch((err) => {
                callback(err, false);
            });
    };

    multipleSamplePrediction = (csvFile, callback) => {
        const formData = new FormData();
        formData.append("csvFile", csvFile);
        axiosClient
            .post(EndPoints.multipleSamplePrediction, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (callback) callback(res, true);
            })
            .catch((err) => {
                if (callback) callback(err, false);
            });
    };

    getMetadata = (data, callback) => {
        axiosClient
            .get(EndPoints.metadata, data)
            .then((res) => {
                const dataSetColumnMapping = res.data.dataset_column_mapping;
                const fuelPrice = res.data.fuelPrice
                runInAction(() => {
                    mainstore.metadata.dataSetColumnMapping = {
                        fuelType: dataSetColumnMapping.fuel_type,
                        roadType: dataSetColumnMapping.road_type,
                    };
                    mainstore.metadata.fuelPrice = fuelPrice
                });
                if (callback) callback(res, true);
            })
            .catch((err) => {
                if (callback) callback(err, false);
            });
    };

    getSingleSamplePredictionHistory = (callback) => {
        axiosClient
            .get(EndPoints.singleSamplePredictionHistory)
            .then((res) => {
                if (callback) callback(res, true);
            })
            .catch((err) => {
                if (callback) callback(err, false);
            });
    };

    getMultipleSamplePredictionHistory = (callback) => {
        axiosClient
            .get(EndPoints.multiSamplePredictionHistory)
            .then((res) => {
                if (callback) callback(res, true);
            })
            .catch((err) => {
                if (callback) callback(err, false);
            });
    };

    getSingleSamplePredictionReport = (id, callback) => {
        axiosClient
            .get(EndPoints.singleSamplePredictionReport + "/" + id, {responseType: 'arraybuffer'})
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `report.pdf`);

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
                if (callback) callback(res, true);
            })
            .catch((err) => {
                if (callback) callback(err, false);
            });
    };

    getMultipleSamplePredictionReport = (id, callback) => {
        axiosClient
            .get(EndPoints.multipleSamplePredictionReport+ "/" + id, {responseType: 'arraybuffer'})
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `report.pdf`);

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
                if (callback) callback(res, true);
            })
            .catch((err) => {
                if (callback) callback(err, false);
            });
    };
}

const apiModal = new ApiRequestsModal();
export default apiModal;
