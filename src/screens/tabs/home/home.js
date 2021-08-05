import React, { useEffect, useState,useMemo } from "react";
import {View, Text, StyleSheet, ImageBackground,Dimensions, TextInput,TouchableOpacity, FlatList, Touchable} from "react-native";
import Btn from "../../../components/btn";
import SearchIcon from "react-native-vector-icons/FontAwesome"
import FillBtn from "../../../components/fillBtn";
import Campaige from "../../../components/campaige";
import { NavigationContainer } from "@react-navigation/native";
import {connect} from "react-redux"
import * as actions from "../../../store/action"
import PageLoader from "../../../components/pageLoader"
import {api} from "../../../config/config.json"
import axios from "axios"
const {width,height}=Dimensions.get('window')

function Home({navigation,fetchCampaiges,campaiges,refreshCampaiges}){

    const [page,setPage]=useState(1)
    const [totalPage,setTotalPage]=useState(0)
    const [refresh,setRefresh]=useState(false)

    useEffect(()=>{
        fetchCampaiges(page)
        getTotalPage()
    },[])

    function pagination(){
        fetchCampaiges(page+1).then(()=>{
            setPage((ps)=>{
                return ps+1
            })
        })
    }

    function loadMore(){
        if(page<totalPage){
            pagination()
        }
    }

    async function getTotalPage(){
    const totalpage=await axios.get(`${api}/campaign-pagination?page=1`)
    setTotalPage(totalpage.data.data.last_page)
    }

    function footer(){
        if(page<totalPage){
            return <PageLoader/>
        }else{
            return null
        }
    }
    function onRefresh(){
        setRefresh(true)
        setPage(1)
        refreshCampaiges(page).then(()=>{
            setRefresh(false)
        })
    }

    function renderContent(){
        if(campaiges.length>0){
            return(
                <FlatList
            showsVerticalScrollIndicator={false}
            style={{flex:1}}
            data={campaiges.filter(item=>item.status=="1")}
            renderItem={renderCampaige}
            keyExtractor={(item,i)=>i.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={loadMore}
            refreshing={refresh}
            onRefresh={onRefresh}
            ListFooterComponent={footer}
            />
            )
        }
        else if(campaiges.length==0){
            return <PageLoader/>
        }else{
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:22,fontWeight:'700'}}>Not Found</Text>
                </View>
            )
        }
    }


    function renderCampaige({item,index}){
        if(index===0){
            return(
                <>
                <View style={{flex:1,width:'100%'}}>
                <ImageBackground
                style={{width:'100%',height:330}}
                source={require('../../../../assets/header.png')}
                >
                    <View style={{marginTop:20,width:'80%',justifyContent:'center',alignItems:'center',marginRight:'auto',marginLeft:'auto'}}>
                        <Text style={{color:'white',fontSize:15,textAlign:'center',fontFamily:'Poppins-Medium'}}>
                            FUNDRAISES FOR THE PEOPLE AND CAUSES YOU CARE ABOUT
                        </Text>
                    </View>
                    <View
                    style={{marginTop:10,width:'70%',marginLeft:'auto',marginRight:'auto'}}
                    >
                        <FillBtn
                        call={()=>navigation.navigate('createCampaige')}
                        color="#f9a533"
                        text="start a raisemefunds"
                        />
                    </View>
                    <View style={{width:'91%',marginLeft:'auto',marginRight:'auto'}}>
                    <ImageBackground
                    style={{width:'100%',height:200,marginTop:20,marginLeft:'auto',marginRight:'auto'}}
                    source={require('../../../../assets/mid.png')}
                    >
                    <View style={{width:'100%',flex:1,justifyContent:'space-around',alignItems:'center',paddingVertical:10}}>
                        <Text style={{color:'#f9a533',fontSize:22,fontFamily:'Poppins-Medium'}}>FUNDRAISE FOR</Text>
                        <Text style={{color:'white',fontSize:16,fontFamily:'Poppins-Medium'}}>WHICH CATEGORY INTEREST YOU?</Text>
                        <Text style={{width:'80%',textAlign:'center',color:'white'}}>
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print
                        </Text>
                        <View style={{width:'70%'}}>
                        <Btn
                        call={()=>navigation.navigate('search')}
                        text="choose category"
                        />
                        </View>
                    </View>

                </ImageBackground>
                    </View>
                </ImageBackground>
            </View>
            <View style={{marginTop:20}}>
                <Text style={{width:'90%',marginLeft:'auto',marginRight:'auto',fontFamily:'Poppins-Medium',fontSize:16,color:'gray'}}>Campaigns</Text>
                <View style={{width:'90%',marginLeft:'auto',marginRight:'auto',backgroundColor:'gray',height:1,marginVertical:5}}/>
                <Campaige 
                data={item}
                callDetails={()=>navigation.navigate('campaigeDetail',item)}
                callDonate={()=>navigation.navigate('donate',item.campaign_id)}
                />
            </View>
            </>
            )
        }else{
            return(
                <Campaige
                data={item}
                callDetails={()=>navigation.navigate('campaigeDetail',item)}
                callDonate={()=>navigation.navigate('donate',item.campaign_id)}
                />
            )
        }
    }




    return(
        <View style={{flex:1}}>
            
            <View style={{flex:1}}>
            <View style={{width:'100%',backgroundColor:'#2092a4'}}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('search')}
            style={{marginTop:15,marginBottom:15,flexDirection:'row',justifyContent:'center',width:'90%',backgroundColor:'white',borderRadius:7,marginLeft:'auto',marginRight:'auto',alignItems:'center',paddingHorizontal:15,height:40}}>
                        <SearchIcon
                        name="search"
                        color="gray"
                        size={20}
                        />
                        <Text style={{color:'gray',fontSize:16,marginLeft:15,includeFontPadding:false}}>SEARCH NOW</Text>
            </TouchableOpacity>
            </View>
                {renderContent()}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({


})

function mapStateToProps({campaiges}){
    return {campaiges}
}

export default connect(mapStateToProps,actions)(Home);
