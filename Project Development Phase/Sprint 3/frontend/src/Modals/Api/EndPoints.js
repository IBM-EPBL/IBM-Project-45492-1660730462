export const BASE_URL = process.env.REACT_APP_API_URL

export const url = (endPoint) => BASE_URL + endPoint


//* EndPoints


export const login = 'user/login'
export const register = 'user/register'
export const validateOtp = 'user/otp'

//profile
export const profile = 'profile'

//metadata
export const metadata = 'metadata'

//predicton
export const singleSamplePrediction = '/predict/single'
export const multipleSamplePrediction = '/predict/multiple'

//prediction history
export const singleSamplePredictionHistory = '/history/single'
export const multiSamplePredictionHistory = '/history/multiple'

//report
export const singleSamplePredictionReport = '/report/single'
export const multipleSamplePredictionReport = '/report/multiple'