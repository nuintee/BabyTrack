import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaViewBase, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import firebase from './firebase'
import LoginScreen from './pages/LoginScreen'
import HomeScreen from './pages/HomeScreen'
import DataScreen from './pages/DataScreen'
import SignupScreen from './pages/SignupScreen'
import SequenceScreen from './pages/SequenceScreen'
import SettingsScreen from './pages/SettingsScreen'

const Stack = createStackNavigator()

export default function App({navigation}){

  let [ isLogged, setIsLogged ] = useState(false)

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  });

  return(
    <NavigationContainer>
      <Stack.Navigator>
        { isLogged ? (
          <>
            <Stack.Screen name = 'sequence' component = { SequenceScreen } options = {{title: 'BabyTrack'}}/>
            <Stack.Screen name = 'home' component = { HomeScreen } options = {{title: 'ホーム'}}/>
          </>
        ) : (
          <>
          <Stack.Screen name = 'signup' component = { SignupScreen } options = {{title: '登録'}}/>
          <Stack.Screen name = 'login' component = { LoginScreen } options = {{title: 'ログイン'}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}