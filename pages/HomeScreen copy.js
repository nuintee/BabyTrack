import React, { useState, useEffect, useRef} from 'react'
import { Text, View, StyleSheet, SafeAreaView} from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../firebase'

const HomeScreen = ({ navigation }) => {

    let [ childrenData, setChildrenData ] = useState(null);
    let [ currentDate, setCurrentDate ] = useState()
    let [ currentChild, setCurrentChild ] = useState(0);
    let [ milkPorion, setMilkPortion ] = useState();
    const flatlist = useRef();

    // Height
    const h = 55
    // Width
    const w = 275
    // BorderRadius
    const br = 20

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        card:{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 80 + '%',
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding:20,
            marginTop: 0,
            marginBottom:10,
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
        card_displayGroup:{
            display:'flex',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            width: 100 + '%'
        },
        actionButtonText:{
            fontWeight: 'bold',
            color: '#FFF',
            fontSize: 16
        },
        inputGroup:{
            marginVertical: 20
        },
        card_displayCupsule:{
            padding:10,
            borderRadius:20,
            backgroundColor:'#919191'
        },
        whiteText:{
            color: '#FFF'
        },
        carouselContainer:{
            display:'flex',
            flexGrow:0,
            width:100+'%',
            flexDirection:'row',
            marginVertical: 10,
        },
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

    const Card = (props) => {
        let { name, color, time } = props;

        color == 'green' ? color = '#86E3CE' : color = '#CCABDA'

        return(
            <>
            <View style = {styles.card}>
                <View　style = {styles.card_displayGroup}>
                    <Text>{name}</Text>
                    
                    <View style = {styles.card_displayCupsule}>
                        <Text style = {styles.whiteText}>{time}</Text>
                    </View>
                </View>

                <View style = {styles.inputGroup}>
                    <TextInput style = {{
                        height:h,
                        width:150,
                        fontSize:20,
                        backgroundColor:'#FFF',
                        borderBottomWidth:2,
                        borderBottomColor: color,
                        paddingHorizontal: 20,
                        marginVertical: 5
                    }} 
                    placeholder = '量'></TextInput>
                </View>

                <TouchableOpacity style = {{
                        display:'flex',
                        justifyContent:'center',
                        alignItems: 'center',
                        borderRadius: br,
                        height: h,
                        width: w,
                        backgroundColor: color,
                        /* Shadow */
                }} 
                onPress = {() => alert('clicked!')}>
                    <Text style = {styles.actionButtonText}>{name}</Text>
                </TouchableOpacity>
            </View>
            </>
        )
    }

    const TimeUpdate = (subject) => {
        return(
            Math.floor ((currentDate - childrenData.children['user_'+currentChild][subject].toDate())　/ 1000　/ 60 )
        )
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid)
        .onSnapshot((snap) => {
            const data = snap.data()
            setChildrenData(data)
        })

        setInterval(() => {
            setCurrentDate(new Date())
        },1000)

        return () => unsubscribe();
    }, [])

    const RenderItem = ({item}) => {
        return(
            Object.keys(item.children).map((key,index) => (
            <TouchableOpacity key = {key} index = {index} 

                style = {
                    {
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor: index == currentChild ? '#FFF': '#AEAEAE',
                        height:50,
                        width: 100,
                        paddingHorizontal:15,
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: index == 0 ? 40 : 20,
                        borderRadius:20,
                        /* Shadow */
                        shadowColor: "#000",
                        shadowOffset: {
                            width:0,
                            height:3
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        //elevation:1
                    }
                } 

                onPress = {() => {
                    setCurrentChild(index)
                }}>
                    
                <TextInput pointerEvents="none" style = {
                    {
                        height:30,
                        borderBottomColor:index == currentChild ? '#86E3CE' : 'grey',borderBottomWidth:2
                    }
                } 
                editable = {false}>{item.children[key].name}</TextInput>

            </TouchableOpacity>
            ))
        )   
    }

    return(
        <SafeAreaView style = {styles.container}>
            {childrenData != null ? (
                <View style = {styles.carouselContainer}>
                    
                    <FlatList ref = {flatlist} data = { [childrenData] }
                        renderItem = {RenderItem}
                        horizontal
                        keyExtractor = {(item,index) => index.toString()}
                        scrollEnabled = {true}
                    />
                </View>
            ) : (
                // 子供がまだいない場合
                <Text>設定からお子様を登録しましょう。</Text>
            )}
            <Card name = 'ミルク' time = { 
                childrenData ? 
                    TimeUpdate('milk') < 60 ? TimeUpdate('milk')　+ '分前' : Math.floor(TimeUpdate('milk') / 60) + '時間前'
                    : 'まだデータがありません'
            }   color = 'green'/>
            <Card name = 'オムツ' time = {
                childrenData ? 
                TimeUpdate('diaper') < 60 ? TimeUpdate('diaper')　+ '分前' : Math.floor(TimeUpdate('diaper') / 60 ) + '時間前'  
                    : 'まだデータがありません'
            }   color = 'purple'/>
        </SafeAreaView>
    )
}

export default HomeScreen