import React, { useState } from 'react'
import {Alert, Text,TouchableOpacity, View} from 'react-native'
import { addItemStyles } from '../css/AddItemStyles'
import { addItem } from '../api/items'
import { useDispatch } from 'react-redux'
import { setItemError,getItemSuccess } from '../redux/itemSlice'
import FormInput from '../components/FormInput'
import { addItemValidation } from '../utils/validation'

const AddItems = () => {
    
    const[title,setTitle] = useState('')
    const[tagline,setTagline] = useState('')
    const[imgURL,setImgURL] = useState('')
    const[imdb,setImdb] = useState('')
    const[description,setDescription] = useState('')
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleAddItem = async () => {
     
        const validate = addItemValidation(title,tagline,imgURL,imdb,description);

        if(!validate.success){
            Alert.alert("Error",validate.message)
            return;
        }

     setLoading(true)

     try {
        const data = await addItem(title,tagline,imgURL,imdb,description);

        if(!data.success){
            Alert.alert("Error",data.messsage)
            dispatch(setItemError(data.messsage))
        }

        setTitle('')
        setTagline('')
        setImgURL('')
        setImdb('')
        setDescription('')

        dispatch(getItemSuccess(data.body))
        
     } catch (error) {
        console.log(error)
        dispatch(setItemError(error.messsage))
     }finally{
        setLoading(false)
    }
    }

  return (
    <View style={addItemStyles.container}>
        <View style={addItemStyles.head}>
            <Text style={addItemStyles.headText}>
                Add Movies
            </Text>
        </View>
        <View style={addItemStyles.form}>
            
            <FormInput
            style={addItemStyles}
            label='Title'
            value={title}
            onChangeText={setTitle}
            placeholder='Enter the title'
            placeholderTextColor="#aaa"
           />
           <FormInput
           style={addItemStyles}
           label='Tagline'
           value={tagline}
           onChangeText={setTagline}
           placeholderTextColor="#aaa"
           />
           <FormInput
           style={addItemStyles}
           label='Image URL'
           value={imgURL}
           onChangeText={setImgURL}
           />
           <FormInput
           style={addItemStyles}
           label='IMDB value (out of 10)'
           value={imdb}
           onChangeText={setImdb}
           />
           <FormInput
           style={addItemStyles}
           label='Description'
           value={description}
           onChangeText={setDescription}
           />

           <TouchableOpacity style={addItemStyles.button} onPress={handleAddItem} disabled={loading}>
            <Text style={addItemStyles.buttonText}>
               {loading ? 'Adding...' : 'Add'}
            </Text>
           </TouchableOpacity>
        </View>
    </View>
  )
}

export default AddItems