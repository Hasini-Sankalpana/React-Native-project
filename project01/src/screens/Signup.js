import React, { useContext, useState } from 'react'
import { View, Text,Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput from '../components/FormInput'
import AppButton from '../components/Buttons';
import { signupUser } from '../api/auth';
import { signupValidation } from '../utils/validation';
import { SignupConstants } from '../constants/TextConstant';
import { useDispatch, useSelector } from 'react-redux';
import { signupSuccess,setUserError,setUserLoading} from '../redux/authSlice';
import { ThemeContext } from '../ThemeProvider';
import { styles } from '../css/Styles';




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
   const themeColors = useContext(ThemeContext); 
  const signup = styles.signup(themeColors); 


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

    dispatch(setUserLoading(true))

    try {
      const data = await signupUser({
        username:formData.username,
        email:formData.email,
        password:formData.password
      });

      if(!data.token){
         Alert.alert("Error", data.message || "Signup failed");
         dispatch(setUserError(data.message || 'Signup failed'));
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
      dispatch(setUserError(error.message));
      Alert.alert('Error', 'Something went wrong');
    }finally{
          dispatch(setUserLoading(false))
    }
  };

  const handleChange = (fieldName,value)=> {
    setFormData(prev => ({
      ...prev,
      [fieldName]:value
    }))
  }

  return (
    <View style={signup.container}>
      <View style={signup.header}>
        <Text style={signup.title}>{SignupConstants.title}</Text>
        <Text style={signup.subtitle}>{SignupConstants.subtitle}</Text>
      </View>

      <View style={signup.form}>
        {FormInputs.map((input)=>(
          <FormInput
          key={input.id}
            style={signup}
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
        title={SignupConstants.button}
        loadingTitle={SignupConstants.buttonLoading}
         style={signup}
         loading={loading}
         onPress={handleSubmit}
         textStyle={signup}
        />

         <Text style={signup.account}>
            {SignupConstants.account}{' '}
          <Text style={signup.link} onPress={() => navigation.navigate('Signin')}>
            {SignupConstants.link}
          </Text>
          </Text>
      </View>
    </View>
  );
}


export default Signup;
