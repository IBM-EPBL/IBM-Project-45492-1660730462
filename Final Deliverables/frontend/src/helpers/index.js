import { Button } from "@mui/material";
import { runInAction } from "mobx";
import { useSnackbar } from "notistack";
import React from "react";
import mainstore from "../Modals/store";
import * as lodash from "lodash";

export const useSnackBarAction = () => {
    const { closeSnackbar } = useSnackbar();
    const dismissOnlyAction = (snackbarId) => {
        return (
            <>
                <Button variant="text" sx={{display: 'inline', color: 'white'}}
                    onClick={() => {
                        closeSnackbar(snackbarId);
                    }}
                >
                    Dismiss
                </Button>
            </>
        );
    };
    return { dismissOnlyAction };
};


export const fetchUserDataFromLocalStorage = () => {
    const otpToken = localStorage.getItem('otpToken') || ''
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    try{
        runInAction(() => {
            mainstore.userRegistration.otpToken = otpToken
            if(user !== null){
                const userObject = JSON.parse(user);
                mainstore.userInfo = userObject;
                mainstore.userInfo.token = token
            }
        })
    }catch{
        console.log('NO user found')
    }
}

export const clearUserRegistrationDataFromLocalStorage = () => {
    localStorage.removeItem('otpToken')
}

export const isOtpTokenExist = () => {
    return mainstore.userRegistration.otpToken !== ''
}

export const isUserLoggedIn = () => {
    return mainstore.userInfo.token !== ''
}

export const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    runInAction(()=> {
        mainstore.userInfo = {
            email: '',
            token: '',
            userId: '',
            name: '',
            mobile: ''
        }
    })
}

export const updateUserInfo = (data) => {
    const user = localStorage.getItem('user')
    var userJSON = JSON.parse(user)
    userJSON = {
        ...userJSON,
        ...data
    }
    localStorage.setItem('user', JSON.stringify(userJSON))
    runInAction(()=> {
        mainstore.userInfo = {
            ...mainstore.userInfo,
            ...data
        }
    })

}

export const getImperialGallonFromLitre = (value) => {
    return lodash.round(value / 4.546, 2)
}

export const getImperialGallonPrice = (value) => {
    return lodash.round(value * 4.546, 2)
}

export const getFuelPrice = () => {
    return mainstore.metadata.fuelPrice.diesel || 0
}


// export const showSnackBar = (msg, severity = '', duration = 5000) => {
//     console.log("Showing snackbar")
//     runInAction(()=>{
//         mainstore.snackBar = {
//             open: true,
//             duration,
//             severity,
//             msg
//         }
//     })
// }