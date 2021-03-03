import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity, Image } from 'react-native-gesture-handler'

import firebase from '../firebase'


const SignupScreen = ({navigation}, props) => {

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
            backgroundColor: colors[theme],
            /* Shadow */

        },
        actionButtonText:{
            fontWeight: 'bold',
            color: '#FFF'
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
            color: colors[theme],
            fontWeight: 'bold'
        }
    })

    let pressHandle = () => {
        firebase.auth().createUserWithEmailAndPassword(emailText,passwordText)
        .then(user => {
            alert('登録完了！')
            navigation.navigate('login')
        })
        .catch(error => {
            alert('Error! ' + error)
        })
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.form}>
                <Text style = {styles.pageTitle}>登録</Text>
                <View style = {styles.inputGroup}>
                    <TextInput style = {styles.textInput} placeholder = 'メールアドレス' onChangeText = {(input) => setEmailText(input)}></TextInput>
                    <TextInput style = {styles.textInput} placeholder = 'パスワード' secureTextEntry = {true} onChangeText = {(input) => setPasswordText(input)}></TextInput>
                </View>
                <TouchableOpacity style = {styles.actionButton} onPress = {pressHandle}>
                    <Text style = {styles.actionButtonText}>登録</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.linkGroup}>
                <Text>アカウントを持っている場合</Text>
                <TouchableOpacity  onPress = {() => navigation.navigate('login')}>
                    <Text style = {styles.linkText}>ログイン</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupScreen