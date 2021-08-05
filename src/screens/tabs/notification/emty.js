import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";

function Empty(){

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image
            style={styles.img}
            source={require('../../../../assets/notIcon.png')}
            />
            <Text style={styles.title}>Nothing to see here yet</Text>
            <Text style={styles.text}>
                Find stories and causes you care about on your home feed to get
                relevant updates here.
            </Text>
        </View>
    )
}

const styles=StyleSheet.create({
    img:{
        width:130,
        height:180,
        resizeMode:'contain',
        marginLeft:40
    },
    title:{
        fontWeight:'700',
        fontSize:22,
        width:'85%',
        textAlign:'center'
    },
    text:{
        width:'85%',
        color:'gray',
        fontSize:14,
        textAlign:'center'
    }
})

export default Empty;