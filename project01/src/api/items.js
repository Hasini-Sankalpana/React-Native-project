import axios from "axios"
import { BASE_URL } from "../constants/ApiConstant";

export const getItem = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/item/item`)

       return response.data;
    } catch (error) {
        const message =error.response?.data?.message || 'Item details cannot be fetched';
        throw new Error(message);
    }
}


export const addItem = async ({title,tagline,imgURL,imdb,description}) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/item/item`,{
            title,
            tagline,
            imgURL,
            imdb,
            description
        })

        return response.data;
    } catch (error) {
        const message=error.response?.data?.message || 'Error occured when adding items.Please try again!'
    }
}