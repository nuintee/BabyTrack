import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaViewBase, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import firebase from './firebase'
import HomeScreen from './pages/HomeScreen'
import AuthScreen from './pages/AuthScreen'
import PasswordResetScreen from './pages/PasswordResetScreen'
import DataScreen from './pages/DataScreen'
import SequenceScreen from './pages/SequenceScreen'
import SettingsScreen from './pages/SettingsScreen'

const Stack = createStackNavigator()

export default function App({navigation}){

  let [ isLogged, setIsLogged ] = useState(false)
  let [ isDone, setIsDone ] = useState(false)

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
            <Stack.Screen name = 'sequence'  component = {SequenceScreen}  options = {{title: '情報登録'}}/>
            <Stack.Screen name = 'home' component = { HomeScreen } options = {{title: 'ホーム', headerLeft: null}}/>
          </>
        ) : (
          <>
            <Stack.Screen name = 'auth' component = { AuthScreen } options = {{ title: 'ログイン',headerShown: false }}/>
            <Stack.Screen name = 'reset' component = { PasswordResetScreen } options = {{title: 'パスワードリセット', headerTintColor: 'grey', headerBackTitleVisible: null, headerTitle: null, headerTransparent: true}} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}