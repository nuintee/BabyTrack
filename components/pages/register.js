import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

import { Header } from '../molecules/molecules'

import firebase from '../firebase'

//Colors
const colors = {
  green: '#86E3CE',
  purple: '#CCABDA',
  red: '#FC887B'
}

const Form = (props) => {
  let { name, email, password, color, page} = props
  let [ text, setText ] = useState()

  const styles = StyleSheet.create({
    form:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:100+'%'
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
      backgroundColor: color
    },
    buttonText:{
      color: '#FFF',
      fontWeight:'bold',
      fontSize: 16
    },
  })

  const clickHandler = () => {
    if (page.title == 'signup'){
      // Creating An Account
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(user => {
        if (user) {
          console.log("Succes to Singup")
        }
      })
      .catch(error => {
        console.error(error)
      })
    }else{
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(response => {
          alert('Login Success!')
      })
      .catch(error => {
        console.error(error)
      })
    }
  }
  
  return (
    <View style = {styles.form}>
      <Text style = {styles.title}>{name}</Text>
      <View style = {styles.inputGroup}>
        <TextInput placeholder = 'メールアドレス' style = {styles.input} className = 'text_inputs' onChangeText = {(text) => this.Pass}></TextInput>
        <TextInput placeholder = 'パスワード' style = {styles.input} className = 'text_inputs'></TextInput>
      </View>
      {/* Action B */}
      <TouchableOpacity  style = {styles.actionButton} onPress = {clickHandler}>
        <Text style = {styles.buttonText}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const FooterNav = (props) => {

  let { name, text, link, color, setPage} = props

  console.log(setPage)

  const styles = StyleSheet.create({
    footerNav:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center',
      marginBottom: 30
    },
    linkText:{
      fontSize: 16,
      fontWeight: 'bold',
      color: color,
      marginLeft:10
    }
  })
  
  return (
    <View style = {styles.footerNav}>
      <Text>{text}</Text>
      <TouchableOpacity onPress = { setPage }>
        <Text style = {styles.linkText}>{link}</Text>
      </TouchableOpacity>
    </View>
  )
}

const  RegisterPage = (props) => {

  let { name, link, text, color } = props

  let [ page, setPage ] = useState({title: 'signup'})
  
  if (page.title == 'signup'){
    name = '登録'
    text = 'アカウントを持っている場合'
    link = 'ログイン'
    color = 'purple'
  }else{
    link = '登録'
    text = 'アカウントを持っていない場合'
    name = 'ログイン'
    color = 'green'
  }

    page.title == 'login' ? page = 'signup' : page = 'login' 

    return(
        <View style = {styles.container}>
            <Header />
            <Form name = {name} color = { colors[color] } page = { page }/>
            <FooterNav link = {link} text = {text} color = { colors[color] } name = {name} setPage = { () => setPage({title:page}) }/>
        </View>
    )
}

let styles = StyleSheet.create({
  container:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#F8F8FA',
    flexBasis:100+'%'
  }
})

  
  

export default RegisterPage