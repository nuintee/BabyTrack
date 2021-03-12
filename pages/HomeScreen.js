import React, { useState, useEffect, useRef} from 'react'
import { Text, View, StyleSheet, SafeAreaView,FlatList, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import Picker from 'react-native-dropdown-picker'
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/Feather';
import firebase from '../firebase'

const HomeScreen = ({ navigation }) => {

    return(
        <SafeAreaView>
            <Swiper />
            <Card title = 'milk'/>
            <Card title = 'diaper' />
        </SafeAreaView>
    )
}

const Swiper = () => {
    return(
        <FlatList />
    )
}

const Card = (props) => {
    let { title, color, action} = props

    if (title == 'milk'){
        title = 'ミルク'
        color = '#86E3CE'
        action = 'number'
    } else {
        title = 'オムツ'
        color = '#CCABDA'
        action = 'select'
    }

    const card_style = StyleSheet.create({
        card:{
            display:'flex',
            flexDirection: 'column',
            alignItems:'center',
            justifyContent: 'space-between',
            backgroundColor:'#FFF',
            margin:10,
            padding: 20,
            borderRadius: 20,
            height: 200,
            shadowColor: "#000",
            shadowOffset: {
                width:0,
                height:3
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation:2
        },
        card_header:{
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: 100 + '%',
            justifyContent: 'space-between',
        },
        card_capsule:{
            padding:10,
            backgroundColor:'grey',
            borderRadius:20
        },
    })
    
    return(
        <View　style = {card_style.card}>

            {/* Header Display */}
            <View style = {card_style.card_header}>
                <Text>{title}</Text>
                {/* Card_capsule */}
                <View style = {card_style.card_capsule}>
                    <Text style = {{color: '#FFF'}}>Time</Text>
                </View>
            </View>

            <Input type = {action} theme = {color}/>

            <ActionButton title = {title} theme = {color}/>

        </View>
    )
}

const ActionButton = (props) => {
    let { title, theme } = props

    const acttionButton_style  = StyleSheet.create({
        actionButton:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: theme,
            height:55,
            width:200,
            borderRadius:20,
        },
        actionButton_text:{
            color: '#FFF',
            fontFamily: 'MPLUSRounded1c'
        }
    })

    return (
        <TouchableOpacity style = {acttionButton_style.actionButton}>
                <Text style = {acttionButton_style.actionButton_text}>{title}</Text>
        </TouchableOpacity>
    )
}

const Input = (props) =>{
    let { type, theme } = props;
    let [ isOpen, setIsOpen ] = useState(false)

    const input_style = StyleSheet.create({
        field:{
            height:40,
            borderBottomColor: theme,
            borderBottomWidth: 2,
            fontSize: 20,
            width: 150,
            textAlign:'center'
        },
        field_text:{
            fontSize: 20,
            textAlign:'center'
        }
    })

    return(
        type == 'select' ? 
        (
            <Picker containerStyle = {input_style.field} items = {[{label: 'Sho', value: 'Sho', selected: true}]}/>
        ) : (
            <TextInput　placeholder = '量(ml)' style = {input_style.field} keyboardType = {'number-pad'} returnKeyLabel = '完了' returnKeyType = 'done'></TextInput>
        )

    )
}

export default HomeScreen