import React, { useEffect } from 'react';
import { 
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Header from "../../../components/backHeader";
import CircleIcon from "react-native-vector-icons/Entypo"
import {imgBaseUrl} from "../../../config/config.json";
import { connect } from 'react-redux';
import * as actions from "../../../store/action"
import PageLoader from "../../../components/pageLoader"
import FillBtn from '../../../components/fillBtn';

const {height,width}=Dimensions.get('window')

function CampaigeDetail({route,donorList,donors,userId,navigation}){

    useEffect(()=>{
        donorList(route.params.id)
    },[])

    function donationPer(donationAmount,amount){
        let per=(donationAmount*100)/amount
        return Math.round(per)
    }

    function renderDonors(){
        if(donors.length>0){
            return donors.map((d,i)=>{
                return(
                    <View key={i} style={styles.donor}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <CircleIcon
                        name="circle"
                        size={10}
                        color="green"
                        />
                        <Text style={{marginLeft:10}}>{d.is_anonymous==0?d.first_name+" "+d.last_name:"Hide Name"}</Text>
                    </View>
                    <Text style={{color:'gray'}}>Donation Amount: <Text style={{color:'green'}}>{d.donation_amount}</Text></Text>
                </View>
                )
            })
        }
        else if(donors.length==0){
            return(
                <View style={{marginLeft:10}}>
                    <Text>not found</Text>
                </View>
            )
        }
        else{
            return <PageLoader/>
        }
    }
    return(
        <View style={{flex:1,paddingBottom:20}}>
            <Header
            title={"Campaige Detail"}
            back={true}
            />
            <ScrollView>
                <Image
                style={styles.img}
                source={{uri:route.params.image_path}}
                />
            <View style={{width:'100%',backgroundColor:'lightgray'}}>
                <View
                style={{...styles.line,width:donationPer(route.params.donatedAmount,route.params.amount)>100?'100%':donationPer(route.params.donatedAmount,route.params.amount).toString()+'%'}}
                />
            </View>
            <View style={styles.con2}>
                <View>
                <View>
                <Text style={{fontSize:22,fontWeight:'bold',color:'gray',marginTop:15}}>{route.params.title.toUpperCase()}</Text>
                <Text style={{fontSize:22,color:'#2092a4'}}>{route.params.amount}$</Text>
                </View>
                <Text>{route.params.category_name}</Text>
                </View>
                <Text>100/<Text style={{color:'green'}}>{donationPer(route.params.donatedAmount,route.params.amount)>100?100:donationPer(route.params.donatedAmount,route.params.amount)}</Text></Text>
            </View>
            <View style={styles.topLine}/>
            <View style={{backgroundColor:'#e5e5e5',marginHorizontal:10,padding:10,marginTop:10}}>
            <Text style={{paddingHorizontal:10,textAlign:'justify',color:'gray'}}>
            {route.params.description}
            </Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginTop:15}}>
                <Text>Start Date {route.params.start_date}</Text>
                <Text>End Date {route.params.end_date}</Text>
            </View>
            </View>
            <View>
                <Text style={{fontSize:16,color:'green',marginLeft:10,marginTop:20}}>DONORS</Text>
                <View style={{...styles.topLine,marginVertical:10}}/>
                {renderDonors()}
                <View style={styles.donor}>
                    <Text>TOTAL DONATION</Text>
                    <Text style={{color:'green',fontWeight:'700',fontSize:18}}>{route.params.donatedAmount+"$"}</Text>
                </View>
            <View>
                </View>
            </View>
            <View style={{width:'95%',marginLeft:'auto',marginRight:'auto'}}>
                <FillBtn
                call={()=>navigation.navigate('donate',route.params.id)}
                color="#f9a533"
                text="DONATE NOW"
                />
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:height/3
    },
    line:{
        height:10,
        backgroundColor:'#2092a4'
    },
    con2:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
    },
    topLine:{
        height:1,
        backgroundColor:'gray',
        marginBottom:10,
        width:'95%',
        marginLeft:'auto',
        marginRight:'auto'
    },
    donor:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        padding:10,
        borderBottomColor:'#dfdfdf',
        borderBottomWidth:1,
        marginHorizontal:10
    }
})

function mapStateToProps({donors,userId}){
    return {donors,userId}
}

export default connect(mapStateToProps,actions)(CampaigeDetail);
