import { observable } from 'mobx'

const mainstore = observable({
    userInfo: {
        userId: '',
        email: '',
        name: '',
        mobile: '',
        token: '',
    },

    // TODO: Will be removed in the future
    // snackBar: {
    //     open: false,
    //     duration: 5000,
    //     msg: '',
    //     severity: ''
    // },

    userRegistration: {
        otpToken: ''
    }

})

export default mainstore
