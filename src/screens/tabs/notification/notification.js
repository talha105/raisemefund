import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import Header from "../../../components/backHeader";
import * as actions from "../../../store/action"
import {connect} from "react-redux"
import List from "./list"
import Empty from "./emty"
import Loader from "../../../components/pageLoader";
import NotifyModel from "../../../components/notifyModel"

function Notification({notification,getNotifcation,userId}){

    useEffect(()=>{
        getNotifcation(userId)
    },[])

    const [currentData,setCurrentData]=useState({})
    const [visible,setVisible]=useState(false);

    function renderModel(con){
        con?setVisible(true):setVisible(false)
    }

    function renderNotification({item}){
        return(
            <TouchableOpacity 
            onPress={()=>{
                setCurrentData(item)
                renderModel(true)
            }}
            style={styles.notCon}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.des}>{item.description?item.description.slice(0,70)+"...":null}</Text>
            </TouchableOpacity>
        )
    }

    function renderContent(){
        if(notification.loading){
            return <Loader/>
        }
        else if(notification.length==0){
            return <Empty/>
        }else{
            return (
                <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex:1,marginTop:5}}
                data={notification}
                keyExtractor={(item,i)=>i.toString()}
                renderItem={renderNotification}
                />
            )
        }
    }

    return(
        <View style={{flex:1}}>
            <Header
            title="Notification"
            />
            <NotifyModel
            title={currentData.title}
            des={currentData.description}
            visible={visible}
            closeModle={()=>renderModel(false)}
            />
            {renderContent()}
        </View>
    )
}

const styles=StyleSheet.create({
    notCon:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor:'white',
        padding:20,
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
        marginVertical:5
    },
    title:{
        color:"#1d8a9b"
    },
    des:{
        color:'gray',
        fontSize:12
    }
})

function mapStateToProps({notification,userId}){
    return {notification,userId}
}

export default connect(mapStateToProps,actions)(Notification);