import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const navigation = useNavigation()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true)
    try {
      const response = await fetch('http://10.0.2.2:3000/api/user/signin',{
        method:"POST",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json()

      if(!data.message){
        console.log(data.message)
      }

      setEmail('')
      setPassword('')

      await AsyncStorage.setItem('token',data.token)
      console.log(data.message)

      navigation.navigate('Home')

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
    

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign In to get started.</Text>
      </View>

      <View style={styles.form}>
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Signin...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
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
    marginBottom: 2,
    marginLeft:5
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color:'#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#0000',
  },
  button: {
    backgroundColor: '#890a83',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Signup;
