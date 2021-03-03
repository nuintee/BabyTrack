import React, { useState } from 'react'
import { View, TextInput, StyleSheet} from 'react-native'

const Input = (props) => {
    const { name, actions} = props
    const { visible, setVisible } = useState(0)
  
    const white = '#FFF'
  
    const style = StyleSheet.create({
      inputField:{
        borderRadius:20,
        padding:15,
        height:55,
        width:275,
        backgroundColor: 'red'
      }
    })
  
    return (
      <View>
        <TextInput style = {style.inputField} placeholder = {name}></TextInput>
      </View>
    )
  }

export default Input