import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
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
        },
        card:{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 80 + '%',
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding:20
        },
        card_displayGroup:{
            display:'flex',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            width: 100 + '%'
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
        inputGroup:{
            marginVertical: 20
        },
        actionTextInput:{
            height:h,
            width:150,
            fontSize:20,
            backgroundColor:'#FFF',
            borderBottomWidth:2,
            borderBottomColor:'#86E3CE',
            paddingHorizontal: 20,
            marginVertical: 5
        },
        card_displayCupsule:{
            padding:10,
            borderRadius:20,
            backgroundColor:'#919191'
        },
        whiteText:{
            color: '#FFF'
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

    const Card = () => {
        return(
            <View style = {styles.card}>

                <View　style = {styles.card_displayGroup}>
                    <Text>ミルク</Text>
                    
                    <View style = {styles.card_displayCupsule}>
                        <Text style = {styles.whiteText}>46分前</Text>
                    </View>

                </View>

                <View style = {styles.inputGroup}>
                    <TextInput style = {styles.actionTextInput} placeholder = '量' autoCapitalize='none' keyboardType = 'numbers-and-punctuation'></TextInput>
                </View>

                <TouchableOpacity style = {styles.actionButton}>
                    <Text style = {styles.actionButtonText}>ミルク</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return(
        <View style = {styles.container}>
            {/* Data Nav Icon */}
            {/* Scroller */}
            {/* Card */}
            {/* Card */}
            <Card />
            <Card />
        </View>
    )
}

export default HomeScreen