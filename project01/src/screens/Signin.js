import  { useContext, useState } from 'react';
import { View, Text,Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput from '../components/FormInput'
import AppButton from '../components/Buttons';
import { signinUser } from '../api/auth';
import { signinValidation } from '../utils/validation';
import { SigninConstants } from '../constants/TextConstant';
import { useDispatch, useSelector } from 'react-redux';
import { signinSuccess,setUserError,setUserLoading } from '../redux/authSlice';
import { ThemeContext } from '../ThemeProvider';
import { styles } from '../css/Styles';



function Signin() {
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const navigation = useNavigation()
  const loading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch();
  const themeColors = useContext(ThemeContext);
  const signin = styles.signin(themeColors);


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
    dispatch(setUserLoading(true))

    try {
      const data = await signinUser(formData)

      if(!data.token){
        Alert.alert("Error",data.message || "signin failed")
        dispatch(setUserError(data.message))
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
      dispatch(setUserError(error.message));
      Alert.alert("Error","Something went wrong.Please try again.")
    }finally{
         dispatch(setUserLoading(false))
    }  

  };

  const handleChange = (fieldName,value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]:value
    }))
  }

  return (
    <View style={signin.container}>
       
      <View style={signin.header}>
        <Text style={signin.title}>{SigninConstants.title}</Text>
        <Text style={signin.subtitle}>{SigninConstants.subtitle}</Text>
      </View>

      <View style={signin.form}>
        {FormInputs.map((input)=> (
          <FormInput
          key={input.id}
          style={signin}
          label={input.label}
          value={formData[input.id]}
          onChangeText={(value) => handleChange(input.id,value)}
          placeholder={input.placeholder}
          keyboardType={input.keyboardType}
          secureTextEntry={input.secureTextEntry}
          placeholderTextColor='#aaa'
        />
        ))}

        <AppButton
          title={SigninConstants.button}
          loadingTitle={SigninConstants.buttonLoading}
          style={signin}
          textStyle={signin}
          loading={loading}
          onPress={handleSubmit}
        />
        <Text style={signin.account}>
          {SigninConstants.account}{' '}
        <Text style={signin.link} onPress={() => navigation.navigate('Signup')}>
          {SigninConstants.link}
        </Text>
        </Text>
      </View>
    
    </View>
  );
}



export default Signin;