import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../constants/ApiConstant";

 
 export const getUser = async() => {
    try {
      const token = await AsyncStorage.getItem("token")
      const response = await axios.get(`${BASE_URL}/api/user/user`,{
        headers:{
          'content-type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })

      return response.data;

    } catch (error) {
        const message =error.response?.data?.message || 'User details cannot be fetched';
        throw new Error(message);
    }
 
 }