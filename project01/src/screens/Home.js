import {useEffect, useState} from 'react';
import { View, Text,TouchableOpacity,ActivityIndicator, Image, FlatList } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../components/Buttons';
import { getUser } from '../api/user';
import { getItem } from '../api/items';
import { HomeConstants } from '../constants/TextConstant';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItemSuccess,setItemError,setItemLoading } from '../redux/itemSlice';
import { getUserSuccess,setUserError,logout,setUserLoading } from '../redux/authSlice';
import { styles } from '../css/Styles';


function Home() {
  const items = useSelector((state) => state.item.items);
  const user = useSelector((state) => state.auth.user);
  const firstName = user?.username?.split(' ')[0];
  const isAdmin = user?.isAdmin;
  const [loading,setLoading] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const home = styles.home;

  //const itemLoading = useSelector((state) => state.item.loading);
  //const userLoading = useSelector((state) => state.auth.loading);
  
 
  //const loading = itemLoading || userLoading;
  

  useEffect(() => {
  const loadAllData = async () => {
      try {  
        await getUserDetails();
        await getItemDetails();
      } catch (error) {
        console.log(error);
      }
    };

    loadAllData();
  }, []);

  const getUserDetails = async() =>{
  dispatch(setUserLoading(true))

    try {
      const data = await getUser();

      if(!data.success){
        console.log(data.message)
        dispatch(setUserError(data.message));
        return;
      }

     dispatch(getUserSuccess(data.body))
     console.log(data.message)
    } catch (error) {
      console.log(error)
      dispatch(setUserError(error.message));
    }finally{
      dispatch(setUserLoading(false));
    }
  }

  const getItemDetails = async() => {
   
   setLoading(true)
    try {
      const data = await getItem();

      if(!data.success){
        dispatch(setItemError(data.message))
        return;
      }
      dispatch(getItemSuccess([...data.body].reverse()));
      console.log(data.message)
    } catch (error) {
      console.log(error)
      dispatch(setItemError(error.message))
    }finally{
         setLoading(false)
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
    <View style={home.container}>
      <View style={home.head}>
        <View style={home.headText}>
        <Text style={home.title}>{HomeConstants.title}</Text>
        <Text style={home.name}>{firstName} !👋</Text>
        </View>
        
        <View style={home.headIcon}>
          {isAdmin ? (
          <Text style={home.headIconText}onPress={()=> navigation.navigate('add-item')}>+</Text>
          ):('')}
       
          <AppButton
           title={HomeConstants.button}
           loadingTitle={HomeConstants.button}
           style={home}
           textStyle={home}
           onPress={handleLogout}
           loading={loading}
           />

        </View>
      </View>
      {/* {error && <Text color='ffffff'>{error}</Text>}*/} 
      {loading ? (
        <ActivityIndicator size='large' color='#a04a3'/>
      ):(

     <FlatList
        data={items}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        renderItem={({ item }) => (  
    <TouchableOpacity style={home.card} onPress={() => handleNavigate(item)}>
      <Image style={home.img} source={{ uri: item.imgURL }} />
      <Text style={home.cardtitle}>{item.title}</Text>
      <Text style={home.cardsubtitle}>{item.imdb}</Text>
    </TouchableOpacity>
  )}
/>
)}
    </View>
  );
}



export default Home;