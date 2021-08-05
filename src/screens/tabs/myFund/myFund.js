import React, { useEffect } from "react";
import {View, Text} from "react-native";
import FundList from "./list"

function MyFund({type}){
    // console.log(props.route.key)
    return(
        <View style={{flex:1}}>
            <FundList type={type}/>
        </View>
    )
}


export default MyFund;