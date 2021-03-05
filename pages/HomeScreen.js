import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../firebase'

const HomeScreen = ({ route, navigation }) => {

    const { dataID } = route.params;


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
        }
    })

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
        <View style = {styles.container}>
            <Text>HomeScreen</Text>

            <TouchableOpacity onPress = { pressHandle } style = {styles.actionButton}>
                <Text>ログアウト</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen