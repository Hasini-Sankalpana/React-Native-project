import React, { useState } from 'react'
import {useNavigation} from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { signupSuccess} from '../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

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

    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true)

    try {
      const response = await fetch('http://10.0.2.2:3000/api/user/signup',{
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
           username,
           email,
           password
        })
      })

      const data = await response.json()

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput 
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder='Enter a username'
            keyboardType='default'
            placeholderTextColor="#aaa"
            />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter your password"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} disabled={loading} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {loading ? 'Signin...':'Create Account'}
            </Text>
        </TouchableOpacity>
         <Text style={styles.account}>
            Already have an account ?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Signin')}>
            Signin
          </Text>
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 25,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
   color: '#fff',
  },
  subtitle: {
    fontSize: 16,
     color: '#ececec',
    marginTop: 8,
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 1,
    marginLeft:5
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
     color:'#fff',
    borderWidth: 1,
    borderColor: '#0000',
  },
  button: {
    backgroundColor: '#890a83',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  account:{
    color:'#ffffff',
    paddingLeft:5
  },
  link:{
    color:'#890a83'
  }
});

export default Signup;
