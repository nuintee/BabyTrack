import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const DataChildScreen = ({route}) => {

    let { subject, who, when, detail, index } = route.params

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
        }
    })

    const EditableRecord = (props) => {
        let { title, display } = props

        switch (title){
            case subject:
                display = '項目'
                break
            case detail:
                display = '詳細'
                break
            case when:
                display = '時間'
                break
            case who:
                display = '保護者'
                break
        }

        return(
            <View style = {styles.editableRecord}>
                <Text>{display}</Text>
                <TextInput style = {styles.recordInput}>{title}</TextInput>
            </View>
        )
    }

    const ActionButton = (props) => {
        let { title, action, color, func} = props

        if (action == 'update'){
            color = '#86E3CE';
            func = () => {alert('update')};
        }
        else{
            color = '#FC887B';
            func = () => {alert('delete')}
        }

        const styles = StyleSheet.create({
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
            <TouchableOpacity style = {styles.actionButton} onPress = {func}>
                <Text style = {styles.actionButtonText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView style = {styles.container}>

            <View style = {styles.record}>
                <View style = {styles.subject_display}>
                    <Text style = {styles.subject_text}>{subject}</Text>
                </View>
                <Text style = {styles.detail_text}>{detail}</Text>
                <Text>{when}</Text>
                <Text>{who}</Text>
            </View>
            
            <View style = {{ width : 100+'%'}}>
                <EditableRecord title = {subject}/>
                <EditableRecord title = {detail}/>
                <EditableRecord title = {when}/>
                <EditableRecord title = {who}/>
            </View>
            
            <View style = {{ marginVertical:5}}>
                
                <ActionButton title = '更新'　action = 'update'/>
                <ActionButton title = '削除'　action = 'delete'/>

            </View>
        </SafeAreaView>
    )
}

export default DataChildScreen