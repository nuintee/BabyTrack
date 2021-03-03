import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const Header = (props) => {
  let {title, left, right, justify} = props;

  const grey = '#BABABA';

  left || right == 0 ? justify = 'center': justify = 'space-around'

  const style = StyleSheet.create({
    header:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent: justify,
      backgroundColor:'#F2F2F2',
      width:100+'%',
      height:70
    },
    text:{
      fontWeight: 'bold',
      color:grey,
      fontSize:20,
    },
    icon:{
      color:grey,
      fontWeight:'bold',
      fontSize:25
    }
  })

  // Default Title
  title = title || 'BabyWatch'

  return(
    <View style = {style.header}>
      {/* <Icon name = 'arrowleft' style = {style.icon}/> */}
      <Text style = {style.text}>{title}</Text>
      {/* <Icon name = 'setting' style = {style.icon}/> */}
    </View>
  )
}

export default Header