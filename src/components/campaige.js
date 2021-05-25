import React from "react";
import {View,Text, TextInput,StyleSheet,Dimensions,Image, TouchableOpacity, Touchable, ImageBackground} from "react-native";
import {imgBaseUrl} from "../config/config.json";

const {height,width}=Dimensions.get('window')

function Campaige({fullUrl,title,imageUrl,btnValue,color,textColor,callDonate,callDetails,data}){

    function donationPer(donationAmount,amount){
        let per=(donationAmount*100)/amount
        return Math.round(per)
    }
    return(
        <TouchableOpacity 
        onPress={()=>{
            callDetails?callDetails():null
        }}
        activeOpacity={0.7} 
        style={styles.campaige}
        >
            <View style={{backgroundColor:'#cacaca',width:'100%'}}>
                <View style={{...styles.line,width:donationPer(data.donatedAmount,data.amount)>100?'100%':donationPer(data.donatedAmount,data.amount).toString()+"%"}}/>
            </View>
            <ImageBackground
            style={{width:'100%',height:210}}
            source={{uri:data.image_path}}
            >
                <View style={{flex:1,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
                <View style={{width:'80%'}}>
                <Text style={{color:'white',fontWeight:'700',fontSize:20,padding:10,...styles.text,width:'100%'}}>{data?data.title:"Campage title"}</Text>
                <Text style={{...styles.text,color:'#ffc600',fontWeight:'700',marginLeft:10}}>{data.category_name?data.category_name.toUpperCase():null}</Text>
                </View>
                <Text style={{marginRight:5,color:'white'}}>100/<Text style={{color:'#faaf3a'}}>{donationPer(data.donatedAmount,data.amount)>100?100:donationPer(data.donatedAmount,data.amount)}</Text></Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <Text style={{paddingRight:10,paddingBottom:5,fontWeight:'700',fontSize:25,color:'#ffc600'}}>{data.amount}$</Text>
                </View>
                </View>
            </ImageBackground>
            <TouchableOpacity 
            onPress={callDonate}
            style={{flex:1,backgroundColor:color?color:'#f9a533',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:textColor?textColor:'white',fontSize:20}}>{btnValue?btnValue:'DONATE'}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    line:{
        height:10,
        backgroundColor:'#2092a4'
    },
    campaige:{
        width:'91%',
        marginRight:'auto',
        marginLeft:'auto',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        height:265,
        backgroundColor:'white',
        marginVertical:10
    },
    text:{
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 6
    }
})

export default Campaige;