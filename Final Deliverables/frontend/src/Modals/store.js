import { observable } from "mobx";

const mainstore = observable({
    userInfo: {
        userId: "",
        email: "",
        name: "",
        mobile: "",
        token: "",
    },

    // TODO: Will be removed in the future
    // snackBar: {
    //     open: false,
    //     duration: 5000,
    //     msg: '',
    //     severity: ''
    // },

    metadata: {
        dataSetColumnMapping: {
            fuelType: [
                {
                    name: "",
                    value: "",
                    label: "",
                },
            ],
            roadType: [
                {
                    name: "",
                    value: "",
                    label: "",
                },
            ],
        },
        fuelPrice: {
            id: "",
            cityId: "",
            petrol: "",
            diesel: "",
            currency: "",
            date: "",
            createdAt: 0,
            changeText: "",
            petrolDiff: "",
            dieselDiff: "",
            cngDiff: null,
            cngPrice: null,
        },
    },

    userRegistration: {
        otpToken: "",
    },
});

export default mainstore;
