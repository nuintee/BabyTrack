import React from 'react'
import { Text, View, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import firebase from '../firebase'

const LoadingScreen = ({ navigation }, props) => {

    setTimeout(() => { navigation.navigate('home')},1000)

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pageTitle:{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#919191'
        },
        helperText:{
            color: '#919191',
            marginTop: 15
        },
        indicator:{
            marginVertical: 20
        }
    })

    return(
        <View style = {styles.container}>
            <Text style = {styles.pageTitle}>完了!</Text>
            <Text　style = {styles.helperText}>データを読み込んでいます...</Text>
            <ActivityIndicator style = {styles.indicator}/>
        </View>
    )
}

export default LoadingScreen