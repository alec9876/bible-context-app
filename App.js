import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BibleStackScreen } from './service/Navigation';
import { DoctrineStackScreen } from './service/Navigation';
import HomeScreen from './src/view/HomeScreen';
import MoreScreen from './src/view/MoreScreen';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
