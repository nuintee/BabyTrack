import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../firebase'

const SettingsScreen = ({navigation}) => {

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    const Logout = () => {
        firebase.auth().signOut()
        .then(() => {
            navigation.navigate('auth')
        })
        .catch(err => {
            alert(err)
        })
    }

    return(
        <View style = {styles.container}>
            <TouchableOpacity　onPress = {() => firebase.auth().signOut()}>
                <Text>ログアウト</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen