import React, { useState } from 'react'
import { View, Text,Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { signupSuccess,setError,setLoading} from '../redux/authSlice';
import { signupUser } from '../api/auth';
import { signupStyles } from '../css/signupStyles';
import FormInput from '../components/FormInput'
import { signupValidation } from '../utils/validation';
import AppButton from '../components/Buttons';


function Signup() {
  const [formData,setFormData] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const loading = useSelector((state) => state.auth.loading)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const FormInputs = [
    {id:'username',label:'Username',placeholder:'Enter a username' ,keyboardType:"default",secureTextEntry:false},
    {id:'email',label:'Email',placeholder:'Enter your email',keyboardType:"email-address",secureTextEntry:false},
    {id:'password',label:'Password',placeholder:'Enter your password',keyboardType:"default",secureTextEntry:true},
    {id:'confirmPassword',label:'Confirm Password',placeholder:'Re-enter your password',keyboardType:"default",secureTextEntry:true}

  ]

  const handleSubmit = async(e) => {
    e.preventDefault();

    const validate = signupValidation(formData)

    if(!validate.success){
      Alert.alert("Error",validate.message)
      return;
    }

    dispatch(setLoading(true))

    try {
      const data = await signupUser({
        username:formData.username,
        email:formData.email,
        password:formData.password
      });

      if(!data.token){
         Alert.alert("Error", data.message || "Signup failed");
         dispatch(setError(data.message || 'Signup failed'));
         return;
      }

      await AsyncStorage.setItem('token',data.token)
      dispatch(signupSuccess({ token: data.token }));
      setFormData({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
      })
    } catch (error) {
      console.log(error)
      dispatch(setError(error.message));
      Alert.alert('Error', 'Something went wrong');
    }finally{
          dispatch(setLoading(false))
    }

  };

  const handleChange = (fieldName,value)=> {
    setFormData(prev => ({
      ...prev,
      [fieldName]:value
    }))
  }

  return (
    <View style={signupStyles.container}>
      <View style={signupStyles.header}>
        <Text style={signupStyles.title}>Welcome!</Text>
        <Text style={signupStyles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={signupStyles.form}>
        {FormInputs.map((input)=>(
          <FormInput
          key={input.id}
            style={signupStyles}
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
        title='Create Account'
        loadingTitle='Signing Up...'
         style={signupStyles}
         loading={loading}
         onPress={handleSubmit}
         textStyle={signupStyles}
        />

         <Text style={signupStyles.account}>
            Already have an account ?{' '}
          <Text style={signupStyles.link} onPress={() => navigation.navigate('Signin')}>
            Signin
          </Text>
          </Text>
      </View>
    </View>
  );
}



export default Signup;
