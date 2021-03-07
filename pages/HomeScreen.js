import React, { useState, useEffect, useRef, Children } from 'react'
import { Text, View, StyleSheet, SafeAreaView} from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../firebase'

const HomeScreen = ({ navigation }) => {

    let [ childrenData, setChildrenData ] = useState(null);
    let [ currentChild, setCurrentChild ] = useState(0);
    let [ lastMilkUpdate, setLastMilkUpdate ] = useState();
    let [ lastDiaperUpdate, setLastDiaperUpdate ] = useState();
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
            marginTop: 10
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
            backgroundColor: '#86E3CE',
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

        name == 'ミルク' ? color = '#86E3CE' : color = 'purple'

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
                    <TextInput style = {styles.actionTextInput} placeholder = '量' autoCapitalize='none' keyboardType = 'numbers-and-punctuation'></TextInput>
                </View>

                <TouchableOpacity style = {styles.actionButton} onPress = {() => setInit(init + 1)}>
                    <Text style = {styles.actionButtonText}>{name}</Text>
                </TouchableOpacity>
            </View>
            </>
        )
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid)
        .onSnapshot((snap) => {
            const data = snap.data()
            setChildrenData(data)
        })

        return () => unsubscribe();
    }, [])

    return(
        <SafeAreaView style = {styles.container}>
            {childrenData != null ? (
                <View style = {styles.carouselContainer}>
                    
                    <FlatList 
                        ref = {flatlist}
                        data = { [childrenData] }
                        renderItem = {({item}) => {
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
                                                marginVertical: 10,
                                                marginLeft: index == 0 ? 40 : 20,
                                                borderRadius:20
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
                        } }
                        horizontal
                        keyExtractor = {(item,index) => index.toString()}
                        scrollEnabled = {true}
                    />
                </View>
            ) : (
                // 子供がまだいない場合
                <Text>設定からお子様を登録しましょう。</Text>
            )}
            {/* Data Nav Icon */}
            {/* Scroller */}
            {/* Card */}
            {/* Card */}
            <Card name = 'ミルク' time = { 
                childrenData ? childrenData.children['user_'+currentChild].milk.toString() : 'まだデータがありません'
            }/>
            <Card name = 'オムツ' time = {
                childrenData ? childrenData.children['user_'+currentChild].diaper.toString() : 'まだデータがありません'
            }/>
        </SafeAreaView>
    )
}

export default HomeScreen