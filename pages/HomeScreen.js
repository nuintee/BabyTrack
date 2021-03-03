import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeScreen = ({ navigation }) => {

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    return(
        <View style = {styles.container}>
            <Text>HomeScreen</Text>

            <TouchableOpacity onPress = {() => navigation.navigate('LoginScreen')}>
                <Text>Click Me</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen