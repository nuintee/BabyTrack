import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

import firebase from '../firebase'

const AuthScreen = ({ navigation }) => {

    let [ page, setPage ] = useState(0)
    let [ emailText, setEmailText ] = useState();
    let [ passwordText, setPasswordText ] = useState();

    const pages = [ 
        { 
            title : '登録',
            color: '#CCABDA',
            desc: 'アカウントを持っている場合',
            reset: null,
            link: 'ログイン'
        },
        {
            title : 'ログイン',
            color: '#86E3CE',
            desc: 'アカウントを持っていない場合',
            reset: 'パスワードを忘れた場合はこちら',
            link: '登録'
        }
    ]

    // Height
    const h = 55
    // Width
    const w = 275
    // BorderRadius
    const br = 20

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        form:{
            width: 100+'%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
        },
        actionButton:{
            display:'flex',
            justifyContent:'center',
            alignItems: 'center',
            borderRadius: br,
            height: h,
            width: w,
            backgroundColor: pages[page].color
            /* Shadow */

        },
        actionButtonText:{
            fontWeight: 'bold',
            color: '#FFF',
            fontSize: 16
        },
        pageTitle:{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#919191'
        },
        textInput:{
            borderRadius: br,
            height:h,
            width:w,
            backgroundColor:'#FFF',
            padding: 20,
            marginVertical: 5
        },
        inputGroup:{
            marginVertical: 20
        },
        linkGroup:{
            position: 'absolute',
            bottom: 10 + '%',
            display: 'flex',
            flexDirection: 'row'
        },
        linkText:{
            marginLeft: 10,
            color: pages[page].color,
            fontWeight: 'bold'
        },
        resetLink:{
            marginTop: 15
        },
        helperText:{
            color: '#919191'
        }
    })

    let pressHandle = () => {
        // SignUp
        if (page == 0){
            firebase.auth().createUserWithEmailAndPassword(emailText,passwordText)
            .then(user => {
                alert('登録完了！')
                navigation.navigate('login')
            })
            .catch(error => {
                alert('Error! ' + error)
            })
        } 
        // Login
        else if (page == 1){
            firebase.auth().signInWithEmailAndPassword(emailText,passwordText)
            .then(user => {
                alert('ログイン成功')
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
            })
        }
    }

    const pagination = () => {
        page == 0 ? setPage(1) : setPage(0)
    }

    return(
        <>
        <View style = {styles.container}>
            <Image 
                source = { require('../assets/babytrack.png')}
                style = { { position : 'absolute', top: 15 + '%'} }
            />
            <View style = {styles.form}>
                <Text style = {styles.pageTitle}>{pages[page].title}</Text>

                <View style = {styles.inputGroup}>
                    <TextInput style = {styles.textInput} placeholder = 'メールアドレス' onChangeText = {(input) => setEmailText(input)} autoCapitalize='none' ></TextInput>
                    <TextInput style = {styles.textInput} placeholder = 'パスワード' secureTextEntry = {true} onChangeText = {(input) => setPasswordText(input)} autoCapitalize='none'></TextInput>
                </View>

                <TouchableOpacity style = {styles.actionButton} onPress = {pressHandle}>
                    <Text style = {styles.actionButtonText}>{pages[page].title}</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.resetLink}>
                    <Text style = {styles.helperText}>{pages[page].reset}</Text>
                </TouchableOpacity>

            </View>
            <View style = {styles.linkGroup}>

                <Text>{pages[page].desc}</Text>

                <TouchableOpacity  onPress = { pagination }>
                    <Text style = {styles.linkText}>{pages[page].link}</Text>
                </TouchableOpacity>
                
            </View>
        </View>
        <StatusBar />
        </>
    )
}

export default AuthScreen