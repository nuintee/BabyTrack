import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';

//Fonts
import { 
  useFonts, 
  BalooBhai2_400Regular,
  BalooBhai2_500Medium,
  BalooBhai2_600SemiBold,
  BalooBhai2_700Bold,
  BalooBhai2_800ExtraBold
} from '@expo-google-fonts/baloo-bhai-2'

import Icon from 'react-native-vector-icons/AntDesign'

import { RegisterPage } from './components/pages/pages'

import firebase from './components/firebase'


export default function App() {
  console.log('App Working')

  return (
    <SafeAreaView>
      <RegisterPage />
      <StatusBar />
    </SafeAreaView>
  );
}



// const Main = (props) => {

//   let { title } = props

//   let grey = '#F8F8FA'
//   let darkGrey = '#919191'

//   const style = StyleSheet.create({
//     body:{
//       display:'flex',
//       flexDirection:'column',
//       alignItems:'center',
//       justifyContent:'center',
//       backgroundColor: grey,
//       height:100+'%'
//     },
//     title:{
//       fontSize:35,
//       color:darkGrey,
//       fontWeight:'bold'
//     }
//   })

//   return (
//     <View style = {style.body}>
//       <Text style = {style.title}>{title}</Text>
//       <View style = {styles.form}>
//         {/* <Input className = 'inputs' name = 'メールアドレス'/>
//         <Input className = 'inputs' name = 'パスワード'/>
//         <ActionButton action = '登録'/> */}
//       </View>
//     </View>
//   )
// }

//Colors
const colors = {
  green: '#86E3CE',
  purple: '#CCABDA',
  red: '#FC887B'
}

let styles = StyleSheet.create({
  body:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#F8F8FA',
    flexBasis:100+'%'
  },
  form:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:100+'%'
  },
  footerNav:{
    display:'flex',
    flexDirection:'row',
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    color:'#919191'
  },
  inputGroup:{
    marginTop:20,
    marginBottom:20
  },
  input:{
    borderRadius:20,
    marginBottom:5,
    marginTop:5,
    height:55,
    backgroundColor:'#FFF',
    width:275,
    padding:20
  },
  actionButton:{
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    height:55,
    width:275,
    backgroundColor: colors.purple
  }
})
