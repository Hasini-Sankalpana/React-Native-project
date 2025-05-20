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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()
  const loading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch();
  
  const handleSubmit = async () => {

   const validate = signinValidation(email,password)

   if(!validate.success){
    Alert.alert("Error",validate.message)
    return;
   }
    setLoading(true)
    try {
      const data = await signinUser(email,password)

      if(!data.token){
        Alert.alert("Error",data.message || "signin failed")
        dispatch(setError(data.message))
        return;
      }

      await AsyncStorage.setItem('token',data.token)
      dispatch(signinSuccess({token:data.token}))

      setEmail('')
      setPassword('')

    } catch (error) {
      console.log(error)
      dispatch(setError(error.message));
      Alert.alert("Error","Something went wrong.Please try again.")
    }finally{
      setLoading(false)
    }
    

  };

  return (
    <View style={signinStyles.container}>
       
      <View style={signinStyles.header}>
        <Text style={signinStyles.title}>Welcome Back!</Text>
        <Text style={signinStyles.subtitle}>Sign In to get started.</Text>
      </View>

      <View style={signinStyles.form}>
        <FormInput
          style={signinStyles}
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />

        <FormInput
          label='Password'
          style={signinStyles}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

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