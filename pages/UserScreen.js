import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { set } from 'react-native-reanimated'
import firebase from '../firebase'

const UserScreen = ({ navigation }, props) => {
    let [ userName, setUserName ] = useState();

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
        inputGroup:{
            marginVertical: 20
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
    })

    const pressHandle = () => {
        userName != null ? navigation.navigate('child',{userName: userName}) : null
    }

    return(
        <View style = {styles.container}>

            <Text style = {styles.pageTitle}>ようこそ</Text>
            <Text　style = {styles.helperText}>お名前を教えてください。</Text>

            <View style = {styles.inputGroup}>
                <TextInput style = {styles.textInput} placeholder = 'お名前' onChangeText = {(input) => setUserName(input)} autoCapitalize='none' ></TextInput>
            </View>

            <TouchableOpacity onPress = { pressHandle } style = {styles.actionButton}>
                <Text style = {styles.actionButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserScreen