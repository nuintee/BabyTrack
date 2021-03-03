import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const SettingsScreen = () => {

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    return(
        <View style = {styles.container}>
            <Text>SettingsScreen</Text>
        </View>
    )
}

export default SettingsScreen