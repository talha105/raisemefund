import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

function FillBtn ({text,call,color}){
    return (
        <TouchableOpacity 
        onPress={call}
        style={{...styles.blueBtn,backgroundColor:color?color:'#1d879a'}}>
            <Text style={{color:'white',fontSize:18}}>{text.toUpperCase()}</Text>
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

export default FillBtn