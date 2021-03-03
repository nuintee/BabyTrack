import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { set } from 'react-native-reanimated'
import firebase from '../firebase'

const SequenceScreen = ({ navigation }, props) => {
    let [ progress, setProgress ] = useState(0);

    const pageTest = ['welcome','child','me','no']
    const len = pageTest.length

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        progressBar:{
            height: 10,
            width: 100 / (len / (progress + 1)) + '%',
            backgroundColor:'red'
        }
    })

    const nextHandle = () => {
        if (progress < len - 1){
            setProgress(progress + 1)
        }
        else {
            setProgress(len - 2)
        }
    }

    const pressHandle = () => {
        firebase.auth().signOut()
        .then(() => {
            alert('ログアウトしました。')
        })
        .catch((error) => {
            alert('エラーが起こりました。')
        })
    }

    return(
        <>
        <View style = {styles.progressBar}></View>

        <View style = {styles.container}>

            <TouchableOpacity onPress = { nextHandle }>
                <Text>NEXT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = { pressHandle }>
                <Text>ログアウト</Text>
            </TouchableOpacity>

        </View>
        </>
    )
}

export default SequenceScreen