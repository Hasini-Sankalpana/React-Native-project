
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './screens/Home';
import Details from './screens/Details';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }}  />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}  />
      
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
