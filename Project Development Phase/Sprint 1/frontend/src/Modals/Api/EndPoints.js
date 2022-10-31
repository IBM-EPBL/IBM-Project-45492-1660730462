export const BASE_URL = process.env.REACT_APP_API_URL

export const url = (endPoint) => BASE_URL + endPoint

//* EndPoints


export const login = 'user/login'
export const register = 'user/register'
export const validateOtp = 'user/otp'

//profile
export const profile = 'profile'