import axios from 'axios'
import { BASE_URL } from '../constants/ApiConstant';

export const signupUser = async({username,email,password})=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/user/signup`,{
           username,
           email,
           password
        })
       
      return response.data;
    } catch (error) {
        const message =error.response?.data?.message || 'Signup failed. Please try again.';
        throw new Error(message);
    }
}

export const signinUser = async ({email,password}) => {
    
    try {
        const response = await axios.post(`${BASE_URL}/api/user/signin`,{
          email,
          password
        })
       console.log(response.data)
        return response.data;

    } catch (error) {
        const message =error.response?.data?.message || 'Signin failed. Please try again.';
        throw new Error(message);
    }
}