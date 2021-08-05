import React from "react";
import {View,Text, TextInput,StyleSheet,Dimensions,Image, TouchableOpacity, Touchable, ImageBackground} from "react-native";
import {imgBaseUrl} from "../config/config.json";

const {height,width}=Dimensions.get('window')

function Campaige({fullUrl,title,imageUrl,btnValue,color,textColor,callDonate,callDetails,data,inactive}){

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
            <View>
                <Image
                style={{width:'100%',height:210}}
                source={{uri:data.image_path}}
                />
                <View style={{width:'100%',flexDirection:"row",justifyContent:'space-between',alignItems:'flex-start',marginTop:5}}>
                <Text style={{color:'#cacaca',fontFamily:'Poppins-Medium',fontSize:20,includeFontPadding:false,width:'70%'}}>{data?data.title:"Campage title"}</Text>
                <Text style={{...styles.text,color:'#ffc600',fontFamily:'Poppins-Medium',includeFontPadding:false,width:'29%',textAlign:'right',fontSize:12}}>{data.category_name?data.category_name.toUpperCase():null}</Text>
                </View>
                <View>
                <View style={{backgroundColor:'#cacaca',width:'100%',borderRadius:10,marginTop:10}}>
                    <View style={{...styles.line,borderRadius:10,width:donationPer(data.donatedAmount,data.amount)>100?'100%':donationPer(data.donatedAmount,data.amount).toString()+"%"}}/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:5}}>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#3fa91e'}}><Text style={{color:'gray'}}>${data.amount+" / "}</Text>${data.donatedAmount?data.donatedAmount:0}</Text>
                    <Text style={{color:'#3fa91e'}}>{donationPer(data.donatedAmount,data.amount)>100?100:donationPer(data.donatedAmount,data.amount)}%</Text>
                </View>                    
                </View>
            <TouchableOpacity 
                activeOpacity={0.5}
                onPress={inactive?callDetails:callDonate}
                style={{backgroundColor:inactive?"red":(color?color:'#f9a533'),width:'100%',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:5}}>
                <Text style={{color:textColor?textColor:'white',fontSize:18,includeFontPadding:false,justifyContent:'center',paddingVertical:7}}>{inactive?"INACTIVE":btnValue?btnValue:'DONATE NOW'}</Text>
            </TouchableOpacity>
            </View>

                

            {/* <View style={{backgroundColor:'#cacaca',width:'100%'}}>
                <View style={{...styles.line,width:donationPer(data.donatedAmount,data.amount)>100?'100%':donationPer(data.donatedAmount,data.amount).toString()+"%"}}/>
            </View>
            <ImageBackground
            style={{width:'100%',height:210}}
            source={{uri:data.image_path}}
            >
                <View style={{flex:1,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
                <View style={{width:'80%'}}>
                <Text style={{color:'white',fontFamily:'Poppins-Medium',fontSize:20,padding:10,...styles.text,width:'100%'}}>{data?data.title:"Campage title"}</Text>
                <Text style={{...styles.text,color:'#ffc600',fontFamily:'Poppins-Medium',marginLeft:10}}>{data.category_name?data.category_name.toUpperCase():null}</Text>
                </View>
                <Text style={{marginRight:5,color:'white'}}>100/<Text style={{color:'#faaf3a'}}>{donationPer(data.donatedAmount,data.amount)>100?100:donationPer(data.donatedAmount,data.amount)}</Text></Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <Text style={{paddingRight:10,paddingBottom:5,fontFamily:'Poppins-Medium',fontSize:25,color:'#ffc600'}}>{data.amount}$</Text>
                </View>
                </View>
            </ImageBackground>
            <TouchableOpacity 
            activeOpacity={0.5}
            onPress={callDonate}
            style={{flex:1,backgroundColor:color?color:'#f9a533',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:textColor?textColor:'white',fontSize:20,fontFamily:'Poppins-Medium'}}>{btnValue?btnValue:'DONATE'}</Text>
            </TouchableOpacity> */}
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    line:{
        height:6,
        backgroundColor:'#3fa91e'
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
        backgroundColor:'white',
        marginVertical:10,
        padding:10,
    }
})

export default Campaige;