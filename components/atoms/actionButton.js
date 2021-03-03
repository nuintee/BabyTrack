import React from 'react'
import { Text, TouchableOpacity } from 'react-native';

const ActionButton = (props) => {
    let { action } = props
  
    //Default Action
    action = action || 'ログイン'
  
    const purple = '#CCABDA'
    const green = '#86E3CE'
  
    const actionList = {
      '登録': {
        color: purple
      },
      'ログイン':{
        color: green
      }
    }
  
    const style = {
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: actionList[action].color,
      height:55,
      borderRadius:20,
      /* Shadow */
      /* shadow */
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      shadowRadius: 6,
      elevation: 1,
    }
  
    const textStyle = {
      color:'#FFF',
      fontWeight:'bold'
    }
  
    return (
      <TouchableOpacity style = {style}>
        <Text style = {textStyle}>{action}</Text>
      </TouchableOpacity>
    )
}

export default ActionButton