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
        donorList(route.params.id?route.params.id:route.params.campaign_id)
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                style={styles.img}
                source={{uri:route.params.image_path}}
                />
            <View style={styles.con2}>
                <View>
                <View>
                <Text style={{fontSize:22,fontFamily:'Poppins-Medium',color:'gray',marginTop:15}}>{route.params.title.toUpperCase()}</Text>
                <Text style={{fontSize:22,color:'#2092a4'}}>{route.params.amount}$</Text>
                </View>
                <Text>{route.params.category_name}</Text>
                </View>
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
            <View style={{width:'95%',marginLeft:'auto',marginRight:'auto'}}>
                <View style={{backgroundColor:'#cacaca',width:'100%',borderRadius:10,marginTop:10}}>
                        <View style={{...styles.line,borderRadius:10,width:donationPer(route.params.donatedAmount,route.params.amount)>100?'100%':donationPer(route.params.donatedAmount,route.params.amount).toString()+"%"}}/>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:5}}>
                        <Text style={{fontFamily:'Poppins-Medium',color:'#3fa91e'}}><Text style={{color:'gray'}}>${route.params.amount+" / "}</Text>${route.params.donatedAmount}</Text>
                        <Text style={{color:'#3fa91e'}}>{donationPer(route.params.donatedAmount,route.params.amount)>100?100:donationPer(route.params.donatedAmount,route.params.amount)}%</Text>
                </View>
            </View>
            <View>
                <Text style={{fontSize:16,color:'green',marginLeft:10,marginTop:20}}>DONORS</Text>
                <View style={{...styles.topLine,marginVertical:10}}/>
                {renderDonors()}
                <View style={styles.donor}>
                    <Text>TOTAL DONATION</Text>
                    <Text style={{color:'green',fontFamily:'Poppins-Medium',fontSize:18}}>${route.params.donatedAmount}</Text>
                </View>
            <View>
                </View>
            </View>
            <View style={{width:'95%',marginLeft:'auto',marginRight:'auto'}}>
                <FillBtn
                call={()=>(route.params.inactive?"":navigation.navigate('donate',route.params.id))}
                color={route.params.inactive?'red':"#f9a533"}
                text={route.params.inactive?"INACTIVE":"DONATE NOW"}
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
        height:6,
        backgroundColor:'#3fa91e'
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
