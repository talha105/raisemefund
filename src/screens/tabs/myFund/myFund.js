import React from "react";
import {View, Text} from "react-native";
import Header from "../../../components/backHeader"
import FundList from "./list"

function MyFund(){
    return(
        <View style={{flex:1}}>
            <Header
            title="my fundraisers"
            />
            <FundList/>
        </View>
    )
}


export default MyFund;