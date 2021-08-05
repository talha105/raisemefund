import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import * as actions from "../../../store/action";
import BackIcon from "react-native-vector-icons/Ionicons"
import Header from "../../../components/backHeader"
import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Step4 from "./step4"
import SuccessModel from "../../../components/succesModel";

function CreateCampaige({userId,createCampaige,navigation}){
    const [step,setStep]=useState(1);
    const [fields,setFields]=useState({
        amount:"",
        category_id:"",
        title:"",
        description:"",
        start_date:"",
        end_date:"",
        image_path:"",
        is_featured:0
    })

    useEffect(()=>{
        navigation.addListener('blur',()=>{
            setStep(1)
            setFields({
                amount:"",
                category_id:"",
                title:"",
                description:"",
                start_date:"",
                end_date:"",
                image_path:"",
                is_featured:0
            })
        })
    },[])


    const [model,setModel]=useState(false)

    function renderModel(con){
        if(con==="show"){
            setModel(true);
        }else{
            setModel(false)
        }
    }

    function getValue(k,v){
        setFields((pS)=>{
            return{
                ...pS,
                [k]:v
            }
        })
    }
    
    function next(){
        setStep((p)=>{
            return p+1
        })
    }
    function pre(){
        if(step>1){
            setStep((p)=>{
                return p-1
            })
        }
    }

    function renderStep(){
        switch(step){
            case 1:
                return <Step1 next={next} values={{...fields}} getValue={getValue}/>
            case 2:
                return <Step2 next={next} values={{...fields}} getValue={getValue}/>
            case 3:
                return <Step3 next={next} values={{...fields}} getValue={getValue}/>
            case 4:
                return <Step4 details={fields} subMit={(renderLoader)=>{
                        createCampaige({...fields,user_id:userId},renderModel,renderLoader)
                }}/>
            default :
                return null
        }
    }
    return(
        <View style={{flex:1}}>
            <SuccessModel
            visible={model}
            title="Successfully created"
            closeModle={()=>renderModel('hide')}
            reDirect={()=>navigation.jumpTo('myFund')}
            />
            <Header
            title="create fundraiser"
            />
            <View style={{flexDirection:'row',alignItems:'center',paddingVertical:10}}>
            {step!==1?
            <TouchableOpacity 
            onPress={pre}
            style={{marginLeft:10}}>
                <BackIcon
                name="chevron-back"
                color="gray"
                size={30}
                />
            </TouchableOpacity>:null
            }
            <Text style={styles.stepHead}>STEP <Text style={{color:'black'}}>{step}</Text> of 4</Text>
            </View>
            <View style={styles.stepper}>
                <View style={{...styles.stepperBox,backgroundColor:step>=1?'#1d879a':'#d7d7d7'}}/>
                <View style={{...styles.stepperBox,backgroundColor:step>=2?'#1d879a':'#d7d7d7'}}/>
                <View style={{...styles.stepperBox,backgroundColor:step>=3?'#1d879a':'#d7d7d7'}}/>
                <View style={{...styles.stepperBox,backgroundColor:step===4?'#1d879a':'#d7d7d7'}}/>
            </View>
                {renderStep()}
        </View>
    )
}

const styles=StyleSheet.create({
    stepperBox:{
        width:'20%',
        height:8
    },
    stepper:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    stepHead:{
        textAlignVertical:'center',
        paddingLeft:10,
        fontSize:18,
        color:'gray',
        borderBottomWidth:1,
        borderBottomColor:'lightgray'
    }
})

function mapStateToProps({userId}){
    return {userId}
}

export default connect(mapStateToProps,actions)(CreateCampaige);
