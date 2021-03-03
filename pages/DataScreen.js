import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const DataScreen = () => {

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    return(
        <View style = {styles.container}>
            <Text>DataScreen</Text>
        </View>
    )
}

export default DataScreen