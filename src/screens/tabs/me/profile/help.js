import React, { useEffect } from "react";
import {View,Text, TextInput, StyleSheet, FlatList, ImageBackground,Dimensions, Image, ScrollView} from "react-native";
import { connect } from "react-redux";
import Header from "../../../../components/backHeader"
import * as actions from "../../../../store/action"
import InputField from "../../../../components/InputField";
import UserIcon from "react-native-vector-icons/FontAwesome"
import MailIcon from "react-native-vector-icons/MaterialCommunityIcons"
import BackIcon from "react-native-vector-icons/Ionicons";
import PhoneIcon from "react-native-vector-icons/Entypo";
import FillBtn from "../../../../components/fillBtn";
const {height,width}=Dimensions.get('window')

function Help({navigation}){

    useEffect(()=>{

    },[])




    return(
        <View style={{flex:1}}>
            <Header
            title="Help"
            back={true}
            />
            <View style={{width:'90%',backgroundColor:'#ebebeb',flex:1,marginVertical:30,marginLeft:'auto',marginRight:'auto'}}>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                <Text
                style={{padding:20,textAlign:'justify'}}
                >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                </Text>
                </ScrollView>
            </View>
           
        </View>
    )
}

const styles=StyleSheet.create({

})

function mapStateToProps(){
    return {r:4}
}

export default connect(mapStateToProps,actions)(Help);