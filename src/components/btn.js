import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';

function Btn ({text,call}){
    return (
        <TouchableOpacity 
        onPress={call}
        style={{...styles.blueBtn,backgroundColor:'rgba(0,0,0,0)',borderColor:'#f9a533',borderWidth:1.5}}>
        <Text style={{color:'#f9a533',fontSize:18,fontFamily:'Poppins-Medium'}}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
      );
}

const styles=StyleSheet.create({
    blueBtn:{
        backgroundColor:'#1d879a',
        width:'100%',
        borderRadius:7,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Btn