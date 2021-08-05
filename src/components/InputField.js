import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';

function InputField ({placeHolder,icon,getValue,password,keyboardType,defaultValue}){
    return (
        <View style={styles.con}>
            <View style={{position:'absolute',left:1}}>
                {icon()}
            </View>
            <TextInput
            defaultValue={defaultValue?defaultValue:null}
            value={defaultValue?defaultValue:null}
            keyboardType={keyboardType==="number"?'number-pad':'default'}
            secureTextEntry={password?true:false}
            onChangeText={(v)=>getValue(v)}
            placeholder={placeHolder}
            style={styles.input}
            />
        </View>

      );
}

const styles=StyleSheet.create({
input:{
    borderBottomColor:'gray',
    borderBottomWidth:1,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    includeFontPadding:false

},
con: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:5
},
})

export default InputField