import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import Home from './screens/Home';
import Details from './screens/Details';
import AddItems from './screens/AddItems';
import Settings from './screens/Settings';
import store from './redux/store';
import { ThemeProvider } from './ThemeProvider';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { signinSuccess } from './redux/authSlice';




const Stack = createNativeStackNavigator();

function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const savedTheme = await AsyncStorage.getItem('theme');
        if (token) {
          dispatch(signinSuccess({ token }));
        }
        if (savedTheme) {
          dispatch(setTheme(savedTheme));
        }
      } catch (error) {
        console.log('Error reading token', error);
        await AsyncStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#a04a3" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={token ? "Home" : "Signin"}>
          {token ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="add-item" component={AddItems} />
              <Stack.Screen name="settings" component={Settings}/>
            </>
          ) : (
            <>
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}