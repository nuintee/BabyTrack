import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, SafeAreaView, SafeAreaViewBase, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntIcon from 'react-native-vector-icons/AntDesign'

import firebase from './firebase'
import HomeScreen from './pages/HomeScreen'
import AuthScreen from './pages/AuthScreen'
import PasswordResetScreen from './pages/PasswordResetScreen'
import DataListScreen from './pages/DataListScreen'
import DataChildScreen from './pages/DataChildScreen'
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
                  <TouchableOpacity 　onPress = {() => navigation.navigation.navigate('data')}>
                    <Icon name = 'bars' size = {20} color = '#BABABA'/>
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity 　onPress = {() => navigation.navigation.navigate('settings')}>
                    <AntIcon name = 'setting' size = {25} color = '#BABABA' />
                  </TouchableOpacity>
                ),
                headerTintColor: '#bababa',
                headerLeftContainerStyle: {marginLeft: 20},
                headerRightContainerStyle: {marginRight: 20}
              })} />
              <Stack.Screen name = 'data'  component = { DataListScreen }  options = {(navigation) => ({
                title: 'データ一覧',
                headerRight: () => (
                  <TouchableOpacity 　onPress = {() => navigation.navigation.navigate('settings')}>
                    <AntIcon name = 'setting' size = {25} color = '#BABABA' />
                  </TouchableOpacity>
                ),
                headerTintColor: '#bababa',
                headerRightContainerStyle: {marginRight: 20}
              })}/>
              <Stack.Screen name = 'dataChild' component = { DataChildScreen } options = {{title: 'データ編集'}} />
              <Stack.Screen name = 'settings' component = { SettingsScreen } options = {{
                title: '設定',
                headerTintColor: '#bababa',
                }} />
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