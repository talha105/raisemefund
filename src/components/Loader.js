import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, ActivityIndicator } from 'react-native';

function LoaderBtn ({color}){
    return (
        <TouchableOpacity style={{...styles.blueBtn,backgroundColor:color?color:'#1d879a'}}>
            <ActivityIndicator color="white" size={30}/>
        </TouchableOpacity>
      );
}

const styles=StyleSheet.create({
    blueBtn:{
        width:'100%',
        borderRadius:7,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default LoaderBtn