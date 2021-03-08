import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, SafeAreaView, SafeAreaViewBase, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import firebase from './firebase'
import HomeScreen from './pages/HomeScreen'
import AuthScreen from './pages/AuthScreen'
import PasswordResetScreen from './pages/PasswordResetScreen'
import DataScreen from './pages/DataScreen'
import UserScreen from './pages/UserScreen'
import ChildScreen from './pages/ChildScreen'
import LoadingScreen from './pages/LoadingScreen'
import SettingsScreen from './pages/SettingsScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator()

export default function App({navigation}){

  let [ isLogged, setIsLogged ] = useState(false)
  let [ isDone, setIsDone ] = useState()

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
              <Stack.Screen name = 'user'  component = { UserScreen }  options = {{title: 'ユーザー名'}}/>
              <Stack.Screen name = 'child'  component = { ChildScreen }  options = {{title: '子供の名前'}}/>
              <Stack.Screen name = 'home' component = { HomeScreen } options = {(navigation) => ({
                title: 'ホーム',
                headerLeft: () => (
                  <Button title = 'データ'　onPress = {() => navigation.navigation.navigate('data')}/>
                )
              })} />
              <Stack.Screen name = 'data'  component = { DataScreen }  options = {(navigation) => ({
                title: 'データ',
                headerRight: () => (
                  <Button title = '設定'　onPress = {() => navigation.navigation.navigate('settings')}/>
                )
              })}/>
              <Stack.Screen name = 'settings' component = { SettingsScreen } />
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