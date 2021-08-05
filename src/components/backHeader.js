import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Touchable } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons"
import {useNavigation} from "@react-navigation/native"
function Header ({title,back}){
    const navigation=useNavigation()
    return (
        <View>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',paddingLeft:25,paddingBottom:15,paddingTop:20}}>
                {back?(
                    <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                    style={{marginRight:15}}>
                        <BackIcon
                        name="arrow-back-circle-outline"
                        color="black"
                        size={30}
                        />
                    </TouchableOpacity>
                ):null}
                <Text style={{fontSize:18,fontFamily:'Poppins-Bold',marginTop:3}}>{title.toUpperCase()}</Text>
            </View>

            <View style={{height:1,backgroundColor:'lightgray'}}/>
        </View>
      );
}

const styles=StyleSheet.create({

})
export default Header