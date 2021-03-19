import React, { useState, useEffect, useRef} from 'react'
import { Text, View, StyleSheet, SafeAreaView,FlatList, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import Picker from 'react-native-dropdown-picker'
import * as Notifications from 'expo-notifications';
import Icon from 'react-native-vector-icons/Feather';
import firebase from '../firebase'
import { divide, set } from 'react-native-reanimated';
import { requestPermissionsAsync } from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const HomeScreen = ({ navigation }) => {

    const [ data, setData ] = useState();
    const [ isSelected, setIsSelected ] = useState(0)
    const [ milkUpdated, setMilkUpdated ] = useState()
    const [ diaperUpdated, setDiaperUpdated ] = useState()

    useEffect(() => {
        firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid)
        .onSnapshot(doc => {
            setData(doc.data())
        } )
    }, [])

    useEffect(() => {
        requestPermissionsAsync()
    })

    const requestPermissionsAsync = async () => {
        const { granted } = await Notifications.getPermissionsAsync()
        if (granted) {return}

        await Notifications.requestPermissionsAsync()
    }

    return(
        <SafeAreaView>
            <Swiper data = {data} setIsSelected = {setIsSelected} isSelected = {isSelected}/>
            <Card title = 'milk' data = {data} index = {isSelected}/>
            <Card title = 'diaper' data = {data} index = {isSelected}/>
        </SafeAreaView>
    )
}

const Swiper = (props) => {
    let { data, isSelected, setIsSelected } = props

    const swiper_style = StyleSheet.create({
        swipe_item:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#FFF',
            height: 90,
            width: 90,
            margin:10,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
                width:0,
                height:3
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation:2
        },
        text_container_active:{
            borderBottomWidth:2,
            borderBottomColor: '#86E3CE',
            height: 25
        },
        text_container_default:{
            borderBottomWidth:2,
            borderBottomColor: '#AFAFAF',
            height: 25,
        },
        text_active:{

        },
        text_default:{
            color: '#AFAFAF'
        }
    })

    const ItemRenderer = ({item}) => {
        return(
            Object.keys(item.children).map((key, index) => (
                <TouchableOpacity style = {swiper_style.swipe_item} onPress = {() => setIsSelected(index)} key = {key}>
                    <View style = { index  == isSelected ? swiper_style.text_container_active : swiper_style.text_container_default}>
                        <Text style = {index == isSelected ? swiper_style.text_active : swiper_style.text_default}>{item.children[key].name}</Text>
                    </View>
                </TouchableOpacity>
            ))
        )
    }

    return(
        data ? (
        <FlatList data = {[data]} renderItem = {ItemRenderer} keyExtractor = {(item) => item.id} horizontal />
        ) : (
        <Text>まだデータがありません</Text>
        )
    )
}

const Capsule = (props) => {
    let { data, index, title } = props
    let [ timeNow, setTimeNow ] = useState(new Date().toString());
    let [ targetDiaper, setTargetDiaper ] = useState();
    let [ targetMilk, setTargetMilk ] = useState();

    useEffect(() => {
        setInterval(() => { setTimeNow(new Date().toString()) },1000)
    },[])

    useEffect(() => {
        if (!data){
            setTargetDiaper('読み込み中です。')
            setTargetMilk('読み込み中です。')
        }
        else {

            // Common
            const targetRef = data.children['user_'+index]

            // Diaper
            const diaperRef = targetRef.diaper.toDate().toString()
            let diaperOut = Math.floor( ( new Date(timeNow) - new Date(diaperRef) ) / 60 / 1000 )
                // Time Separation
                if (diaperOut >= 1440){
                    diaperOut = '約' + Math.ceil(diaperOut / 60 / 24) + '日前'
                }
                else if (diaperOut < 1440 && diaperOut >= 60) {
                    diaperOut = diaperOut / 60 + '時間前'
                }
                else if ( diaperOut < 60){
                    diaperOut += '分前'
                }
            setTargetDiaper( diaperOut )

            // Milk
            const milkRef = targetRef.milk.toDate().toString()
            let milkOut = Math.floor( ( new Date(timeNow) - new Date(milkRef) ) / 60 / 1000 )
                // Time Separation
                if (milkOut >= 1440){
                    milkOut = '約'+ Math.ceil(milkOut / 60 / 24) + '日前'
                }
                else if (milkOut < 1440 && milkOut >= 60) {
                    milkOut = milkOut / 60 + '時間前'
                }
                else if ( milkOut < 60){
                    milkOut += '分前'
                }
            setTargetMilk(milkOut)
        }
    })

    const capsule_style = StyleSheet.create({
        card_capsule:{
            padding:10,
            backgroundColor:'grey',
            borderRadius:20
        }
    })

    return (
        <View style = {capsule_style.card_capsule}>
            {title == 'milk' ? (<Text style = {{color: '#FFF'}}>{targetDiaper}</Text>) : (<Text style = {{color: '#FFF'}}>{targetMilk}</Text>)}
        </View>
    )
}

const Card = (props) => {
    let { title, color, action, data, index, display} = props

    if (title == 'milk'){
        display = 'ミルク'
        color = '#86E3CE'
        action = 'number'
    } else {
        display = 'オムツ'
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
        }
    })
    
    return(
        <View　style = {card_style.card}>

            {/* Header Display */}
            <View style = {card_style.card_header}>
                <Text>{display}</Text>
                {/* Card_capsule */}
                <Capsule data = {data} index = {index} title = {title}/>
            </View>

            <Input type = {action} theme = {color}/>

            <ActionButton title = {display} theme = {color}/>

        </View>
    )
}

const ActionButton = (props) => {
    let { title, theme } = props

    // const scheduleNotificationAsync = async () => {
    //     Notifications.scheduleNotificationAsync({
    //         content: {
    //             body: '最終更新は1時間前です。',
    //             title: `${title}の時間です。`,
    //             sound: 'defaultCritical'
    //         },
    //         trigger: {
    //             seconds: 1,
    //         }
    //     })
    // }


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
            color: '#FFF'
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
            <Picker containerStyle = {input_style.field} items = {[{label: 'うんち', value: 'poo', selected: true},{label: 'おしっこ',value: 'pee'}]}/>
        ) : (
            <TextInput　placeholder = '量(ml)' style = {input_style.field} keyboardType = 'number-pad' returnKeyLabel = '完了' returnKeyType = 'done'></TextInput>
        )

    )
}

export default HomeScreen