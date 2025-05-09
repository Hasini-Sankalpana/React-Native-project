import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

function Home() {
  const[username,setUsername] = useState('')
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    getUserDetails();
    getItemDetails();
  },[])

  const getUserDetails = async() =>{
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem("token")
      const response = await fetch('http://10.0.2.2:3000/api/user/user',{
        method:"GET",
        headers:{
          'content-type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })

      const data = await response.json()
      if(!data.message){
        console.log(data.message)
      }

      setUsername(data.body.username)
      //console.log(data.body.username)
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const getItemDetails = async() => {
    setLoading(true)

    try {
      const response = await fetch('http://10.0.2.2:3000/api/item/item',{
        method:"GET",
        headers:{
          'content-type':'application/json'
        }
      })

      const data = await response.json()
      if(!data.success){
        console.log(data.message)
      }

      setItems(data.body.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigate = (item) => {
    navigation.navigate('Details',{item})
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.name}>{username.split(' ')[0]} !</Text>
      </View>
      <ScrollView style={styles.cards}>
        {items.map((i, index) => (
          <TouchableOpacity style={styles.card} key={index} onPress={() => handleNavigate(i)}>
            <Text style={styles.cardtitle}>{i.title}</Text>
            <Text style={styles.cardsubtitle}>{i.tagline}</Text>
          </TouchableOpacity>
  ))}
</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingBottom:50,
    paddingLeft:30,
    gap: 40,
    backgroundColor:'#000000'
  },
  head:{
    display:'flex',
    flexDirection:'row',
    paddingLeft:10,
    gap:10
  },
  title:{
    fontSize:30,
    color:'#ffff'

  },
  name:{
    fontSize:30,
    color:'#ab04a3',
    fontWeight:700
  },
  cards:{
    display:'flex',
    flexDirection:'column',
    flexWrap:'wrap'
  },
  card:{
    backgroundColor:'#4b0548',
    width:350,
    borderRadius:10,
    padding:10,
    paddingLeft:20,
    display:'flex',
    justifyContent:'center',
    alignItems:'left',
    gap:10,
    marginTop:20
    
  },
  cardtitle:{
    fontSize:20,
    fontWeight:'bold',
    color:'#fdfdfd'
  },
  cardsubtitle:{
    fontSize:15,
    color:'#d4d4d4'
  }

});

export default Home;