import React, { useEffect } from "react";
import {View,Text, TextInput, StyleSheet, FlatList} from "react-native";
import { connect } from "react-redux";
import Header from "../../../components/backHeader"
import Campaige from "../../../components/campaige";
import * as actions from "../../../store/action";
import Loader from "../../../components/pageLoader"

function SearchResult({navigation,searchCampaiges,route,searchByText,searchByCat,clearSearchResult}){

    useEffect(()=>{

        console.log(route.params)
        if(route.params.category){
            searchByCat(route.params.category)
        }else{
            searchByText(route.params)
        }
        navigation.addListener('blur',()=>{
            clearSearchResult()
        })
    },[])

    function renderCampaige({item}){
        return(
            <Campaige
            data={item}
            callDetails={()=>navigation.navigate('campaigeDetail',item)}
            callDonate={()=>navigation.navigate('donate')}
            callDonate={()=>navigation.navigate('donate')}
            />
        )
    }

    function renderContent(){
        if(searchCampaiges.length>0){
            return(
                    <View style={{flex:1}}>
                        <FlatList
                        data={searchCampaiges}
                        renderItem={renderCampaige}
                        keyExtractor={(item,i)=>i.toString()}
                        />
                    </View>
            )
        }
        if(searchCampaiges.length==0){
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20}}>No Result Found</Text>
                </View>
            )
        }
        if(searchCampaiges.loading==true){
            return <Loader/>
        }
    }

    return(
        <View style={{flex:1}}>
                    <Header
                    title="Search Result"
                    back={true}
                    />
                   {renderContent()}
        </View>
    )
}

const style=StyleSheet.create({

})

function mapStateToProps({searchCampaiges}){
    return {searchCampaiges}
}

export default connect(mapStateToProps,actions)(SearchResult);