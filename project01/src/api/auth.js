import axios from 'axios'

export const signupUser = async({username,email,password})=>{
    try {
        const response = await axios.post('http://10.0.2.2:3000/api/user/signup',{
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
        const response = await axios.post('http://10.0.2.2:3000/api/user/signin',{
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