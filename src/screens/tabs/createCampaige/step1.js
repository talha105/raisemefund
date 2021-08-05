import React, { Component,useEffect,useState } from 'react';
import { View, Text ,StyleSheet, ScrollView} from 'react-native';
import InputField from '../../../components/InputField';
import MoneyIcon from "react-native-vector-icons/MaterialIcons";
import {Picker} from '@react-native-picker/picker';
import FillBtn from '../../../components/fillBtn';
import * as action from "../../../store/action";
import {connect} from "react-redux"


function Step1({getValue,values,next,cat,getCat}){
    const [submit,setSubmit]=useState(false)

    useEffect(()=>{
        getCat()
    },[])
    return(
        <View style={styles.con}>
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>FUNDRAISER DETAIL</Text>
            <Text style={styles.text}>
                How much would you like to raise?
            </Text>
            <InputField
            keyboardType="number"
            defaultValue={values.amount}
            getValue={(v)=>getValue('amount',v)}
            icon={()=>{
                return(
                    <MoneyIcon 
                    name="attach-money"
                    color="gray"
                    size={20}
                    />
                )
            }}
            placeHolder="Amount"
            />
             {Number(values.amount)<6 && submit && values.amount?<Text style={{color:'red',textAlign:'right'}}>must be greater than 5$</Text>:null}
            {!values.amount && submit?<Text style={{color:'red',textAlign:'right'}}>Please Fill</Text>:null}
            <Text style={styles.text}>
                Select a category for your fundraiser page
            </Text>
            <View style={{borderBottomColor:'gray',borderBottomWidth:1,marginVertical:10}}>
                <Picker
                selectedValue={values.category_id}
                onValueChange={(itemValue, itemIndex) =>
                    getValue('category_id',itemValue)
                }>
                    <Picker.Item label="Please select" value="" color="gray" />
                    {cat.map((c)=>{
                        return <Picker.Item key={c.id} label={c.category_name} value={c.id} />
                    })}
                </Picker>
            </View>
            {!values.category_id && submit?<Text style={{color:'red',textAlign:'right'}}>Please select</Text>:null}
            <View style={{marginTop:20,marginBottom:20}}>
                <FillBtn
                text="Continue"
                call={()=>{
                    setSubmit(true);
                    if(values.amount && values.category_id && Number(values.amount)>5){
                        next()
                    }
                }}
                />
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:18,
        fontFamily:'Poppins-Bold',
    },
    con:{
        flex:1,
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

function mapStateToProps({cat}){
    return {cat}
}
export default connect(mapStateToProps,action)(Step1);
