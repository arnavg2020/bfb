import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Signup from './components/signup';
import Pledge from './components/pledge';
import Profile from './components/profile';
import Input from './components/input';
import Leaderboard from './components/leaderboard';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
      >
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Sign Up' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Login', headerLeft: null }}
      />
      <Stack.Screen 
       name="Pledge" 
       component={Pledge} 
       options={{ title: 'Pledge', headerLeft: null }}
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: 'Profile', headerLeft: null }}
      />
      <Stack.Screen 
        name="Input" 
        component={Input} 
        options={{ title: 'Input', headerLeft: null }}
      />
      <Stack.Screen 
        name="Leaderboard" 
        component={Leaderboard} 
        options={{ title: 'Leaderboard', headerLeft: null }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}