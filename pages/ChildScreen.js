import { firestore } from 'firebase'
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { set } from 'react-native-reanimated'
import firebase from '../firebase'

const ChildScreen = ({ route, navigation }) => {
    let [ childName, setChildName ] = useState();
    
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

        if (childName != null){
            firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid).get({})
            .then((doc) => {
                if (doc.data()){
                    // Creating Auto Incremented ID -->
                    // let len = Object.keys(doc.data().children).length
                    // let lastData = Object.keys(doc.data().children)[len - 1]
                    // let lastIndex = lastData.match(/\d/g).pop()
                    // let nextIndex = Number(lastIndex) + 1
                    // <--

                    // If there is userdata already => Update
                    firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid).update({
                        [`children.user_${0}.name`]: childName
                    })
                    .then(() => {
                        alert('更新しました！')
                        navigation.navigate('home')
                    })
                    .catch(err => {
                        alert(err)
                    })
                }
                else{
                    // If there is no userdata yet => Add
                    firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid).set({
                        'children.user_0': { name : childName, milk : firebase.firestore.FieldValue.serverTimestamp(), diaper: firebase.firestore.FieldValue.serverTimestamp()},
                        email: firebase.auth().currentUser.email
                    })
                    .then(() => {
                        alert('追加しました!')
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

            <Text style = {styles.pageTitle}>お子様を追加</Text>
            <Text　style = {styles.helperText}>お子様のお名前を教えてください。</Text>

            <View style = {styles.inputGroup}>
                <TextInput style = {styles.textInput} placeholder = 'お名前' onChangeText = {(input) => setChildName(input)} autoCapitalize='none' ></TextInput>
            </View>

            <TouchableOpacity onPress = { pressHandle } style = {styles.actionButton}>
                <Text style = {styles.actionButtonText}>完了</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChildScreen