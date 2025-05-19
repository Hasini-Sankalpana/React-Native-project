import React, { useState } from 'react'
import { View, Text,TouchableOpacity, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { signupSuccess,setError} from '../redux/authSlice';
import { signupUser } from '../api/auth';
import { signupStyles } from '../css/signupStyles';
import FormInput from '../components/FormInput'
import { signupValidation } from '../utils/validation';


function Signup() {
  const [username,setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleSubmit = async(e) => {
    e.preventDefault();

    const validate = signupValidation(username,email,password,confirmPassword)

    if(!validate.success){
      Alert.alert("Error",validate.message)
      return;
    }

    setLoading(true)

    try {
      const data = await signupUser(username,email,password)

      if(!data.token){
         Alert.alert("Error", data.message || "Signup failed");
         dispatch(setError(data.message || 'Signup failed'));
         return;
      }

      await AsyncStorage.setItem('token',data.token)
      dispatch(signupSuccess({ token: data.token }));
      navigation.navigate('Home')
      
    } catch (error) {
      console.log(error)
      dispatch(setError(error.message));
      Alert.alert('Error', 'Something went wrong');
    }finally{
      setLoading(false)
    }

  };

  return (
    <View style={signupStyles.container}>
      <View style={signupStyles.header}>
        <Text style={signupStyles.title}>Welcome!</Text>
        <Text style={signupStyles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={signupStyles.form}>
   
        <FormInput
            style={signupStyles}
            label='Username'
            value={username}
            onChangeText={setUsername}
            placeholder='Enter a username'
            keyboardType='default'
            placeholderTextColor="#aaa"
            />
        <FormInput
          style={signupStyles}
          label='Email'
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />

        <FormInput
          style={signupStyles}
          label='Password'
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <FormInput
          style={signupStyles}
          label='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter your password"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={signupStyles.button} disabled={loading} onPress={handleSubmit}>
          <Text style={signupStyles.buttonText}>
            {loading ? 'Signin...':'Create Account'}
            </Text>
        </TouchableOpacity>
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
