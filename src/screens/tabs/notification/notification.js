import React, { useEffect } from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import Header from "../../../components/backHeader";
import * as actions from "../../../store/action"
import {connect} from "react-redux"
import List from "./list"
import Empty from "./emty"
import Loader from "../../../components/pageLoader";

function Notification({notification,getNotifcation}){

    useEffect(()=>{
        getNotifcation()
    },[])

    function renderNotification({item}){
        return(
            <View style={styles.notCon}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.des}>{item.description?item.description.slice(0,100)+"...":null}</Text>
            </View>
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

function mapStateToProps({notification}){
    return {notification}
}

export default connect(mapStateToProps,actions)(Notification);