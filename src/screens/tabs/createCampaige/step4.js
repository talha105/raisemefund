import React, { Component, useEffect,useState } from 'react';
import { View, Text,StyleSheet, Image, ScrollView } from 'react-native';
import FillBtn from '../../../components/fillBtn';
import {connect} from "react-redux"
import * as actions from "../../../store/action"
import Loader from "../../../components/Loader";

function Step4({details,subMit,cat,getCat}){
    useEffect(()=>{
        getCat()
    },[])

    function getCatName(id){
        const catName=cat.filter((c)=>id===c.id)
        return catName[0].category_name
    }

    function renderLoader(con){
        if(con==="show"){
            setLoading(true);
        }else{
            setLoading(false)
        }
    }

    const [loading,setLoading]=useState(false)
    return(
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.con}>
            <Text style={styles.title}>Preview funraiser details</Text>
            <Image
            style={{width:'100%',height:200,marginTop:20}}
            source={{uri:details.image_path.path}}
            />
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,alignItems:'center'}}>
                <View>
                <Text style={{fontSize:18}}>{details.title.toUpperCase()}</Text>
                <Text style={{fontSize:13,color:'gray'}}>CATEGORY: {getCatName(details.category_id)}</Text>
                </View>
                <Text style={{fontWeight:'700',color:'green'}}>{details.amount} $</Text>
            </View>
            <View style={{marginTop:10}}>
            <Text style={{backgroundColor:'#e1e1e1',padding:10,color:'gray',fontSize:13}}>{details.description}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={{fontSize:13,color:'black'}}>End Date: </Text>
                <Text style={{fontSize:13,color:'#1d879a',marginLeft:10}}>{details.end_date.toString().slice(0,15)}</Text>
            </View>
            <View style={{marginVertical:20}}>
                {loading?<Loader color="#1d879a"/>:(
                <FillBtn
                text="Submit funraiser"
                call={()=>{
                    renderLoader('show')
                    subMit(renderLoader)
                }}
            />
                )}
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
        marginTop:20,
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto'
    },
})

function mapStateToProps({cat}){
    return {cat}
}

export default connect(mapStateToProps,actions)(Step4);