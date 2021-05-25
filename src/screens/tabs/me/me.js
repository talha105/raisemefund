import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "../../../components/backHeader"
import ListMe from "./list"
function Me(){
    return(
        <View>
            <Header
            title="setting"
            back={true}
            />
            <ListMe/>
        </View> 
    )
}

const styles=StyleSheet.create({
    
})

export default Me;