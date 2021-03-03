import React, { useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity, ActivityIndicator } from 'react-native-gesture-handler'

import firebase from '../firebase'

const LoginScreen = ({ navigation },props) => {

    let { title, theme} = props

    let [ emailText, setEmailText ] = useState();
    let [ passwordText, setPasswordText ] = useState();

    title == 'signup' ?  theme = 'purple' : theme = 'green'

    // Height
    const h = 55
    // Width
    const w = 275
    // BorderRadius
    const br = 20

    const colors = {
        green: '#86E3CE',
        purple: '#CCABDA'
    }

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
            backgroundColor: colors['purple'],
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
            display: 'flex',
            flexDirection: 'row'
        },
        linkText:{
            marginLeft: 10,
            color: colors['purple'],
            fontWeight: 'bold'
        }
    })

    let pressHandle = () => {
        firebase.auth().signInWithEmailAndPassword(emailText,passwordText)
        .then(user => {
            alert('ログイン成功')
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
        })
    }

    return(
        <View style = {styles.container}>
            <Image 
                source = { require('../assets/babytrack.png')}
                style = { { position : 'absolute', top: 15 + '%'} }
            />
            <View style = {styles.form}>
                <Text style = {styles.pageTitle}>ログイン</Text>
                <View style = {styles.inputGroup}>
                    <TextInput style = {styles.textInput} placeholder = 'メールアドレス' onChangeText = {(input) => setEmailText(input)} autoCapitalize='none' ></TextInput>
                    <TextInput style = {styles.textInput} placeholder = 'パスワード' secureTextEntry = {true} onChangeText = {(input) => setPasswordText(input)} autoCapitalize='none'></TextInput>
                </View>
                <TouchableOpacity style = {styles.actionButton} onPress = {pressHandle}>
                    <Text style = {styles.actionButtonText}>ログイン</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.linkGroup}>
                <Text>アカウントを持っていない場合</Text>
                <TouchableOpacity  onPress = {() => navigation.navigate('signup')}>
                    <Text style = {styles.linkText}>登録</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen