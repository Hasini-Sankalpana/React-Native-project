import React, { useState } from 'react'
import {Alert, Text,View} from 'react-native'
import { useDispatch } from 'react-redux'
import { addItemStyles } from '../css/AddItemStyles'
import { addItem } from '../api/items'
import { setItemError,getItemSuccess } from '../redux/itemSlice'
import FormInput from '../components/FormInput'
import { addItemValidation } from '../utils/validation'
import AppButton from '../components/Buttons'

const AddItems = () => {
    
    const [formData,setFormData] = useState({
        title:'',
        tagline:'',
        imgURL:'',
        imdb:'',
        description:''
    });
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    const FormInputs = [
        {id:'title',label:'Title' ,placeholder:'Enter the title'},
        {id:'tagline',label:'tagline', placeholder:''},
        {id:'imgURL',label:'Image URL'},
        {id:'imdb' ,label:'IMDB value (out of 10)'},
        {id:'description',label:'Description'}
    ]


    const handleAddItem = async () => {
     
        const validate = addItemValidation(formData);

        if(!validate.success){
            Alert.alert("Error",validate.message)
            return;
        }

     setLoading(true)

     try {
        const data = await addItem(formData);

        if(!data.success){
            Alert.alert("Error",data.messsage)
            dispatch(setItemError(data.messsage))
        }

        
        dispatch(getItemSuccess(data.body))
        setFormData({
        title:'',
        tagline:'',
        imgURL:'',
        imdb:'',
        description:''
        })
        
     } catch (error) {
        console.log(error)
        dispatch(setItemError(error.messsage))
     }finally{
        setLoading(false)
    }
    }

    const handleChange = (fieldName,value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]:value
        }))
    }

  return (
    <View style={addItemStyles.container}>
        <View style={addItemStyles.head}>
            <Text style={addItemStyles.headText}>
                Add Movies
            </Text>
        </View>
        <View style={addItemStyles.form}>

            {FormInputs.map((input)=>(
                <FormInput
                key={input.id}
                style={addItemStyles}
                label={input.label}
                value={formData[input.id]}
                onChangeText={(value) => handleChange(input.id,value)}
                placeholder={input.placeholder}
                placeholderTextColor="#aaa"
           />
            ))}
            
           <AppButton 
            title='Add'
            loadingTitle='Adding...'
            style={addItemStyles}
            textStyle={addItemStyles}
            onPress={handleAddItem}
            loading={loading}
            />

        </View>
    </View>
  )
}

export default AddItems