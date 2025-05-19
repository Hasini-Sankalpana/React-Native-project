import axios from "axios"

export const getItem = async () => {
    try {
        const response = await axios.get('http://10.0.2.2:3000/api/item/item')

       return response.data;
    } catch (error) {
        const message =error.response?.data?.message || 'Item details cannot be fetched';
        throw new Error(message);
    }
}


export const addItem = async (title,tagline,imgURL,imdb,description) => {
    try {
        const response = await axios.post('http://10.0.2.2:3000/api/item/item',{
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