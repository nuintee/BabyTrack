import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated'
import firebase from '../firebase'

const DataListScreen = ({navigation}) => {
    const [ recordData, setRecordData ] = useState(null)

    useEffect(() => {

        const unsubscribe = firebase.firestore().collection('Record').doc(firebase.auth().currentUser.uid)
        .onSnapshot((snap) => {
            const data = snap.data()
            setRecordData(data)
        })

        return () => unsubscribe();
    },[])


    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    const RecordBar = (props) => {
        let { subject, who, when, detail, index } = props

        //Time Formatt -->
        const month = when.getMonth() + 1;
        const date = when.getDate();
        const hour = when.getHours();
        const minutes = when.getMinutes();

        const time = `${month}/${date}-${hour}:${minutes}`
        // <--

        // Judging by it's type
        typeof detail == 'number' ? detail += 'ml' : detail

        const styles = StyleSheet.create({
            record:{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width:300,
                justifyContent: 'space-between',
                backgroundColor: '#FFF',
                borderRadius:20,
                padding: 20,
                marginVertical:5,
                /* Shadow */
                shadowColor: "#000",
                shadowOffset: {
                    width:0,
                    height:3
                },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                //elevation:1
            },
            subject_display: {
                backgroundColor: subject == 'milk' ? '#86E3CE' : '#CCABDA',
                padding:10,
                borderRadius:20
            },
            subject_text:{
                color: '#FFF'
            },
            detail_text:{
                fontWeight:'bold'
            }
        })

        const pressHandler = () => {
            navigation.navigate('dataChild',{
                subject : subject,
                when : time,
                who : who,
                detail : detail,
                index: index
            })
        }

        return (
            <TouchableOpacity style = {styles.record} onPress = {pressHandler}>
                <View style = {styles.subject_display}>
                    <Text style = {styles.subject_text}>{subject}</Text>
                </View>
                <Text style = {styles.detail_text}>{detail}</Text>
                <Text>{time}</Text>
                <Text>{who}</Text>
            </TouchableOpacity>
        )
    }
    
    const RenderItem = ({item}) => {
        return (
            Object.keys(item).map((key,index) => (
                <RecordBar key = {key} subject = {item[key].subject} who = {item[key].who} when = {item[key].when.toDate()} detail = {item[key].detail} index = {index} />
            ))
        )
    }

    return(
        <View style = {styles.container}>
             {recordData != null ? (
                <FlatList data = {[recordData]} renderItem = {RenderItem} keyExtractor = {(item,index) => index.toString()} inverted/>
             ) : (
                <Text>データがありません</Text>
             )}
        </View>
    )
}

export default DataListScreen