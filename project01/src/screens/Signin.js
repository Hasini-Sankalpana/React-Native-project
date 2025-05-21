import  { useState } from 'react';
import { View, Text,Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signinSuccess,setError,setLoading } from '../redux/authSlice';
import { signinUser } from '../api/auth';
import { signinStyles } from '../css/signinStyles';
import FormInput from '../components/FormInput'
import { signinValidation } from '../utils/validation';
import AppButton from '../components/Buttons';


function Signin() {
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const navigation = useNavigation()
  const loading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch();

  const FormInputs = [
    {id:'email',label:'Email',placeholder:'Enter your email',keyboardType:"email-address",secureTextEntry:false},
    {id:'password',label:'Password',placeholder:'Enter your password',keyboardType:"default",secureTextEntry:true}
  ]
  
  const handleSubmit = async () => {

   const validate = signinValidation(formData)

   if(!validate.success){
    Alert.alert("Error",validate.message)
    return;
   }
    dispatch(setLoading(true))

    try {
      const data = await signinUser(formData)

      if(!data.token){
        Alert.alert("Error",data.message || "signin failed")
        dispatch(setError(data.message))
        return;
      }

      await AsyncStorage.setItem('token',data.token)
      dispatch(signinSuccess({token:data.token}))

      setFormData({
        email:'',
        password:'',
      })

    } catch (error) {
      console.log(error)
      dispatch(setError(error.message));
      Alert.alert("Error","Something went wrong.Please try again.")
    }finally{
         dispatch(setLoading(false))

    }  

  };

  const handleChange = (fieldName,value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]:value
    }))
  }

  return (
    <View style={signinStyles.container}>
       
      <View style={signinStyles.header}>
        <Text style={signinStyles.title}>Welcome Back!</Text>
        <Text style={signinStyles.subtitle}>Sign In to get started.</Text>
      </View>

      <View style={signinStyles.form}>
        {FormInputs.map((input)=> (
          <FormInput
          key={input.id}
          style={signinStyles}
          label={input.label}
          value={formData[input.id]}
          onChangeText={(value) => handleChange(input.id,value)}
          placeholder={input.placeholder}
          keyboardType={input.keyboardType}
          secureTextEntry={input.secureTextEntry}
          placeholderTextColor="#aaa"
        />
        ))}

        <AppButton
          title='Sign In'
          loadingTitle='Signin...'
          style={signinStyles}
          textStyle={signinStyles}
          loading={loading}
          onPress={handleSubmit}
        />
        <Text style={signinStyles.account}>
          Don't have an account?{' '}
        <Text style={signinStyles.link} onPress={() => navigation.navigate('Signup')}>
          SignUp
        </Text>
        </Text>
      </View>
    
    </View>
  );
}



export default Signin;