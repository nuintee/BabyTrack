import { auth, firestore } from 'firebase'
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

        const documentRef = "collection('User').doc(firebase.auth().currentUser.uid)";
        if (userName != null){
            firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid).get({})
            .then((doc) => {
                if (doc.data()){
                    // If there is userdata already => Update
                    firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid).update({
                        owner: userName
                    })
                    .then(() => {
                        alert('更新しました！')
                        navigation.navigate('child')
                    })
                    .catch(err => {
                        alert(err)
                    })
                }
                else{
                    // If there is no userdata yet => Add
                    firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid).set({
                        owner: userName,
                        email: firebase.auth().currentUser.email
                    })
                    .then(() => {
                        alert('追加しました!')
                        navigation.navigate('child')
                    })
                    .catch(err => {
                        alert(err)
                    })
                }
            })
            .catch((err) => {
                alert(err)
            })
        }

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