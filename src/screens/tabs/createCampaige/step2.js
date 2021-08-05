import React, { Component,useState } from 'react';
import { View, Text ,StyleSheet, TextInput, ScrollView} from 'react-native';
import InputField from '../../../components/InputField';
import TitleIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {Picker} from '@react-native-picker/picker';
import FillBtn from '../../../components/fillBtn';


function Step2({getValue,values,next}){
    const [submit,setSubmit]=useState(false)
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.con}>
            <Text style={styles.title}>Describe why you are fundrasing</Text>
            <Text style={styles.text}>
                Customize your fundraiser title
            </Text>
            <InputField
            defaultValue={values.title}
            getValue={(v)=>getValue('title',v)}
            icon={()=>{
                return(
                    <TitleIcon 
                    name="format-title"
                    color="gray"
                    size={20}
                    />
                )
            }}
            placeHolder="enter Title"
            />
            {!values.title && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
            <Text style={styles.text}>
                Explain why this cause means a lot to you
            </Text>
            <View style={{borderBottomWidth:1,borderBottomColor:'gray'}}>
                <TextInput
                defaultValue={values.description}
                onChangeText={(v)=>getValue('description',v)}
                multiline={true}
                numberOfLines={5}
                placeholder="Description"
                textAlignVertical="top"
                />
            </View>
            {!values.description && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
            <View style={{marginTop:20}}>
                <FillBtn
                text="Continue"
                call={()=>{
                    setSubmit(true);
                    if(values.title && values.description){
                        next()
                    }
                }}
                />
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:18,
        fontFamily:'Poppins-Bold',
        width:'70%'
    },
    con:{
        marginTop:40,
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto'
    },
    text:{
        color:'gray',
        fontSize:15,
        marginTop:20,
        marginBottom:20
    }
})

export default Step2;
