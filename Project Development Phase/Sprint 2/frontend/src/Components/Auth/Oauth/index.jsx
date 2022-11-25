import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import mainstore from "../../../Modals/store";

export default observer(function OauthPage() {
    const [searchParams] = useSearchParams()

    const setUserDataAndTokenInLocalStorage = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    useEffect(() => {
        const data =  searchParams.get('data').replace(/'/g, '"')
        console.log(data)
        if(data !== null){
            const json = JSON.parse(data)
            console.log(json)
            setUserDataAndTokenInLocalStorage(json.user, json.token)
            runInAction(()=> {
                mainstore.userInfo = {
                    email: json.user.email,
                    mobile: json.user.mobile,
                    name: json.user.name,
                    userId: json.user.id
                }
            }, [])
        }
    }, []);
    return <div>OauthPage</div>;
})
