import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { TextInput, NumberInput, TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../firebase'

const DataChildScreen = ({route}) => {

    let { subject, who, when, detail, index } = route.params

    let [ updSubject, setUpdSubject ] = useState(subject)
    let [ updDetail, setUpdDetail ] = useState(detail)
    let [ updTime, setUpdTime ] = useState(when)
    let [ updWho, setUpdWho ] = useState(who)

    // Time Separater
    const str = when.split( /[\/\-\:]/g )
    const num = str.map(nb => parseInt(nb))

    const [ month, date, hour, minutes ] = num

    // Height
    const h = 55
    // Width
    const w = 275
    // BorderRadius
    const br = 20

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        record:{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width:300,
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            borderRadius:20,
            padding: 20,
            marginTop:20,
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
        },
        editableRecord:{
            display: 'flex',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent: 'space-between',
            padding: 20,
            marginVertical:5,
            backgroundColor:'#FFF'
        },
        recordInput:{
            width:150,
            backgroundColor:'#FFF',
            borderBottomWidth:1,
            borderBottomColor: '#E3E0E0',
            padding:10,
            marginHorizontal:10,
            textAlign: 'center'
        },
        timeRecordContainer:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
        },
        timeRecordText:{
            backgroundColor:'#FFF',
            borderBottomWidth:1,
            borderBottomColor: '#E3E0E0',
            padding:10,
            marginHorizontal:10,
            textAlign: 'center'
        }
    })

    const EditableRecord = (props) => {
        let { title, display, oct } = props

        if (title == subject){
            display = '項目'
        } else if (title == detail){
            display = '詳細'
        } else if (title == when){
            display = '時間'
        } else if (title == who){
            display = '保護者'
        }

        return(
            <View style = {styles.editableRecord}>
                <Text>{display}</Text>
                {title == when 
                ? (
                    <View style = {styles.timeRecordContainer}>
                        <TextInput style = {styles.timeRecordText}>{month}</TextInput>
                        <Text>/</Text>
                        <TextInput style = {styles.timeRecordText}>{date}</TextInput>
                        <Text>-</Text>
                        <TextInput style = {styles.timeRecordText}>{hour}</TextInput>
                        <Text>:</Text>
                        <TextInput style = {styles.timeRecordText}>{minutes}</TextInput>
                    </View>
                )
                : <TextInput style = {styles.recordInput}>{title}</TextInput>              
                }
            </View>
        )
    }

    const updateRecord = () => {
        firebase.firestore().collection('Record').doc(firebase.auth().currentUser.uid).update({
            [`record_${index}.detail`] : updDetail,
            [`record_${index}.subject`] : updSubject,
            [`record_${index}.who`] : updWho,
        })
        .then(() => {

        })
        .catch(err => {
            alert(err)
        }) 
    }

    const deleteRecord = () => {
        firebase.firestore().collection('Record').doc(firebase.auth().currentUser.uid).update({
            [`record_${index}`] : firebase.firestore.FieldValue.delete(),
        })
        .then(() => {
            alert('deleted')
        })
        .catch(err => {
            alert(err)
        }) 
    }

    const ActionButton = (props) => {
        let { title, action, color, func} = props

        if (action == 'update'){
            color = '#86E3CE';
            func  = () => updateRecord;
        } 
        else {
            color = '#FC887B';
            func = () => deleteRecord
        }

        const ABStyles = StyleSheet.create({
            actionButton:{
                display:'flex',
                justifyContent:'center',
                alignItems: 'center',
                borderRadius: br,
                height: h,
                width: w,
                backgroundColor: color,
                marginVertical:5,
                /* Shadow */
                shadowColor: "#000",
                shadowOffset: {
                    width:0,
                    height:3
                },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation:1
            },
            actionButtonText:{
                fontWeight: 'bold',
                color: '#FFF',
                fontSize: 16
            },
        })


        return(
            <TouchableOpacity style = {ABStyles.actionButton} onPress = {func}>
                <Text style = {ABStyles.actionButtonText}>{title}</Text>
            </TouchableOpacity>
        )
    }


    return(
        <SafeAreaView style = {styles.container}>

            {/* The Top One */}
            <View style = {styles.record}>
                <View style = {styles.subject_display}>
                    <Text style = {styles.subject_text}>{updSubject}</Text>
                </View>
                <Text style = {styles.detail_text}>{updDetail}</Text>
                <Text>{updTime}</Text>
                <Text>{updWho}</Text>
            </View>
            
            <View style = {{ width : 100+'%'}}>
                <EditableRecord title = {updSubject}/>
                <EditableRecord title = {updDetail}/>
                <EditableRecord title = {updTime}/>
                <EditableRecord title = {updWho}/>
            </View>
            
            <View style = {{ marginVertical:5}}>
                
                <ActionButton title = '更新'　action = 'update'/>
                <ActionButton title = '削除'　action = 'delete'/>

            </View>
        </SafeAreaView>
    )
}

export default DataChildScreen