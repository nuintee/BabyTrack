import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../firebase'

const HomeScreen = ({ navigation }) => {

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    const pressHandle = () => {
        firebase.auth().signOut()
        .then(() => {
            alert('ログアウトしました。')
            navigation.navigate('auth')
        })
        .catch((error) => {
            alert('エラーが起こりました。')
        })
    }

    return(
        <View style = {styles.container}>
            <Text>HomeScreen</Text>

            <TouchableOpacity onPress = { pressHandle }>
                <Text>ログアウト</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen