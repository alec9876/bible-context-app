import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { onAuthStateChanged} from 'firebase/auth';
import { auth } from './firebase/authConfig';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator  } from '@react-navigation/stack';

import { BibleStackScreen } from './service/Navigation';
import { DoctrineStackScreen } from './service/Navigation';
import HomeScreen from './src/view/HomeScreen';
import MoreScreen from './src/view/MoreScreen';
import LoginScreen from './src/view/LoginScreen';
import RegistrationScreen from './src/view/RegistrationScreen';
import EmailVerifyScreen from './src/view/EmailVerifyScreen';

export default function App() {
  const [user, setUser] = useState();

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();


  useEffect(() => {
    const unsubscribe = 
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if(user.emailVerified){
            //console.log("true");
            setUser(user);
          }
        } else {
          //console.log("false");
          setUser(null);
        }
      });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
    { user ? (
      <Tab.Navigator
          screenOptions={({route}) => ({
          headerShown: false,
          headerTintColor: 'white',
          tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if(route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline'
          } else if (route.name === 'Bible') {
              iconName = focused ? 'book' : 'book-outline'
          } else if (route.name === 'Doctrine') {
              iconName = focused ? 'document-text' : 'document-text-outline'
          } else if (route.name === 'More') {
              iconName = focused ? 'md-ellipsis-horizontal-sharp' : 'md-ellipsis-horizontal-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'salmon',
          tabBarLabelStyle: {
          fontSize: 13,
          },
          tabBarStyle: {
          backgroundColor: '#333',
          }
      })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Bible" component={BibleStackScreen} />
          <Tab.Screen name="Doctrine" component={DoctrineStackScreen} />
          <Tab.Screen name="More" component={MoreScreen} />
      </Tab.Navigator>
    ) : (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="EmailVerify" component={EmailVerifyScreen} />
      </Stack.Navigator>
    )}
    <StatusBar style='light'/>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  }
});

