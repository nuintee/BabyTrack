import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, SafeAreaViewBase, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import firebase from './firebase'
import LoginScreen from './pages/LoginScreen'
import HomeScreen from './pages/HomeScreen'
import DataScreen from './pages/DataScreen'
import SignupScreen from './pages/SignupScreen'
import SettingsScreen from './pages/SettingsScreen'

const Stack = createStackNavigator()

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'signup' component = { SignupScreen } initialRouteName = 'signup' options = {{title: '登録'}}/>
        <Stack.Screen name = 'login' component = { LoginScreen } options = {{title: 'ログイン'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}