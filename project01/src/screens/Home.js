import {useEffect} from 'react';
import { View, Text,TouchableOpacity,ActivityIndicator, Image, FlatList } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItemSuccess,setLoading,setItemError } from '../redux/itemSlice';
import { getUserSuccess,setError,logout } from '../redux/authSlice';
import { getUser } from '../api/user';
import { getItem } from '../api/items';
import {homeStyles} from '../css/homeStyles'
import AppButton from '../components/Buttons';


function Home() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const items = useSelector((state) => state.item.items);
  const loading = useSelector((state) => state.item.loading);
  const firstName = user?.username?.split(' ')[0];
  const isAdmin = user?.isAdmin
  

  useEffect(() => {
    getUserDetails();
    getItemDetails();
  },[])


  const getUserDetails = async() =>{
    dispatch(setLoading(true))

    try {
      const data = await getUser();

      if(!data.success){
        console.log(data.message)
        dispatch(setError(data.message));
        return;
      }

     dispatch(getUserSuccess(data.body))
     console.log(data.message)
    } catch (error) {
      console.log(error)
      dispatch(setError(error.message));
    }finally{
      dispatch(setLoading(false));
    }
  }

  const getItemDetails = async() => {
    dispatch(setLoading())

    try {
      const data = await getItem();

      if(!data.success){
        dispatch(setItemError(data.message))
        return;
      }

      dispatch(getItemSuccess(data.body.reverse()))
    } catch (error) {
      console.log(error)
      dispatch(setItemError(error.message))
    }
  }

  const handleNavigate = (item) => {
    navigation.navigate('Details',{item})
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token')
    dispatch(logout());
  }

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.head}>
        <View style={homeStyles.headText}>
        <Text style={homeStyles.title}>Hello</Text>
        <Text style={homeStyles.name}>{firstName} !👋</Text>
        </View>
        
        <View style={homeStyles.headIcon}>
          {isAdmin ? (
          <Text style={homeStyles.headIconText}onPress={()=> navigation.navigate('add-item')}>+</Text>
          ):('')}
       
          <AppButton
           title='Logout'
           loadingTitle='Logout'
           style={homeStyles}
           textStyle={homeStyles}
           onPress={handleLogout}
           loading={loading}
           />

        </View>
      </View>
     
      {loading ? (
        <ActivityIndicator size='large' color='#a04a3'/>
      ):(

     <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-arround' }}
        renderItem={({ item }) => (  
    <TouchableOpacity style={homeStyles.card} onPress={() => handleNavigate(item)}>
      <Image style={homeStyles.img} source={{ uri: item.imgURL }} />
      <Text style={homeStyles.cardtitle}>{item.title}</Text>
      <Text style={homeStyles.cardsubtitle}>{item.imdb}</Text>
    </TouchableOpacity>
  )}
/>
)}
    </View>
  );
}



export default Home;