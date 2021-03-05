import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

import firebase from '../firebase'

const PasswordResetScreen = ({ navigation }) => {

    let [ emailText, setEmailText ] = useState();

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
            backgroundColor: '#86E3CE'
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
        helperText:{
            color: '#919191',
            marginTop: 15
        },
        inputGroup:{
            marginVertical: 20
        },
    })

    let pressHandle = () => {
        firebase.auth().sendPasswordResetEmail(emailText).then(() => {
            Alert.alert('パスワードリセット', 'メールを送信致しました。')
          }).catch((error) => {
            alert('エラーがおきました。')
        });
    }

    return(
        <>
        <View style = {styles.container}>
            {/* <Image 
                source = { require('../assets/babytrack.png')}
                style = { { position : 'absolute', top: 15 + '%'} }
            /> */}
            <View style = {styles.form}>
                <Text style = {styles.pageTitle}>パスワード再設定</Text>
                <Text style = {styles.helperText}>以下に再設定リンクをお送りいたします。</Text>

                <View style = {styles.inputGroup}>
                    <TextInput style = {styles.textInput} placeholder = 'メールアドレス' onChangeText = {(input) => setEmailText(input)} autoCapitalize='none' ></TextInput>
                </View>

                <TouchableOpacity style = {styles.actionButton} onPress = {pressHandle}>
                    <Text style = {styles.actionButtonText}>リンク送信</Text>
                </TouchableOpacity>
            </View>
        </View>
        <StatusBar />
        </>
    )
}

export default PasswordResetScreen