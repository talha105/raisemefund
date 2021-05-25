import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import Campaige from "../../../components/campaige";
import {useNavigation} from "@react-navigation/native";
import PageLoader from "../../../components/pageLoader"
import {connect} from "react-redux"
import * as actions from "../../../store/action"
import {imgBaseUrl} from "../../../config/config.json"

function FundList({userCampaiges,fetchUserCampaiges,userId}){
    const navigation=useNavigation()
    const [refresh,setRefresh]=useState(false)
    useEffect(()=>{
        fetchUserCampaiges(userId)
    },[])

    function myFund({item}){
        return(
            <Campaige
            data={item}
            callDetails={()=>navigation.navigate('campaigeDetail',item)}
            callDonate={()=>navigation.navigate('donate',item.id)}
            />
        )
    }
    function onRefresh(){
        setRefresh(true)
        fetchUserCampaiges(userId).then(()=>{
            setRefresh(false)
        })
    }

    function renderContent(){
        if(userCampaiges.length>0){
            return(
                <FlatList
            data={userCampaiges}
            renderItem={myFund}
            keyExtractor={(item,i)=>i.toString()}
            refreshing={refresh}
            onRefresh={onRefresh}
            />
            )
        }
        else if(userCampaiges.length==0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:24,fontWeight:'700'}}>Not Found</Text>
                </View>
            )
        }else{
            return(
                <PageLoader/>
            )
        }
    }
    return(
        <View style={{flex:1}}>
            {renderContent()}
        </View>
    )
}

const styles=StyleSheet.create({
    
})

function mapStateToProps({userCampaiges,userId}){
    return {userCampaiges,userId}
}

export default connect(mapStateToProps,actions)(FundList);