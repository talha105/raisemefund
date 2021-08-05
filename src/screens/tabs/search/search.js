import React, { useState } from "react";
import {View, Text, StyleSheet,TouchableOpacity,TextInput,Dimensions, ScrollView} from "react-native";
import Header from "../../../components/backHeader";
import SearchIcon from "react-native-vector-icons/FontAwesome"
import MedicalIcon from "react-native-vector-icons/FontAwesome5"
import EduIcon from "react-native-vector-icons/Ionicons"
import MemoIcon from "react-native-vector-icons/Entypo"
import NonPrIcon from "react-native-vector-icons/AntDesign"

const {width,height}=Dimensions.get('window')

function Search({navigation}){

    const [searchText,setSearchText]=useState("")
    const [submit,setSubmit]=useState(false)

    return(
        <View style={{flex:1,paddingBottom:10}}>
            <Header
            title="browse raisemefund"
            back={true}
            />
            <View 
            style={{marginTop:10,marginBottom:10,flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'white',borderRadius:7,marginLeft:'auto',marginRight:'auto',alignItems:'center',paddingHorizontal:15,height:40,borderWidth:0.75,borderColor:!searchText && submit?'red':null}}>
                        <TextInput
                        placeholder="SEARCH"
                        style={{flex:1,fontFamily:'Poppins-Medium',includeFontPadding:false}}
                        onChangeText={v=>setSearchText(v)}
                        />
                        <TouchableOpacity
                        onPress={()=>{
                            setSubmit(true)
                            if(searchText){
                                setSubmit(false)
                                navigation.navigate('searchResult',searchText)
                            }
                        }}
                        >
                        <SearchIcon
                        name="search"
                        color="gray"
                        size={20}
                        />
                        </TouchableOpacity>
            </View>
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <View style={styles.con}>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('searchResult',{category:'medical'})}
                    >
                    <View style={styles.IconCon}>
                        <MedicalIcon
                        name="briefcase-medical"
                        color="white"
                        size={50}
                        />
                        <Text style={{fontSize:15,color:'white',paddingTop:10,fontFamily:'Poppins-Medium'}}>MEDICAL</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('searchResult',{category:'emergency'})}
                    >
                    <View style={styles.IconCon}>
                        <MedicalIcon
                        name="bullhorn"
                        color="white"
                        size={50}
                        />
                        <Text style={{fontSize:15,color:'white',paddingTop:10,fontFamily:'Poppins-Medium'}}>EMERGENCY</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.con}>
                   <TouchableOpacity
                   onPress={()=>navigation.navigate('searchResult',{category:'education'})}
                   >
                   <View style={styles.IconCon}>
                        <EduIcon
                        name="school"
                        color="white"
                        size={50}
                        />
                        <Text style={{fontSize:15,color:'white',paddingTop:10,fontFamily:'Poppins-Medium'}}>EDUCATION</Text>
                    </View>
                   </TouchableOpacity>
                   <TouchableOpacity
                   onPress={()=>navigation.navigate('searchResult',{category:'hospital'})}
                   >
                   <View style={styles.IconCon}>
                        <MedicalIcon
                        name="hospital-user"
                        color="white"
                        size={50}
                        />
                        <Text style={{fontSize:15,color:'white',paddingTop:10,fontFamily:'Poppins-Medium'}}>HOSPITAL</Text>
                    </View>
                   </TouchableOpacity>
                </View>
                <View style={styles.con}>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('searchResult',{category:'memorial'})}
                    >
                    <View style={styles.IconCon}>
                        <MemoIcon
                        name="light-up"
                        color="white"
                        size={50}
                        />
                        <Text style={{fontSize:15,color:'white',paddingTop:10,fontFamily:'Poppins-Medium'}}>MEMORIAL</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('searchResult',{category:'non profit'})}
                    >
                    <View style={styles.IconCon}>
                        <NonPrIcon
                        name="star"
                        color="white"
                        size={50}
                        />
                        <Text style={{fontSize:15,color:'white',paddingTop:10,fontFamily:'Poppins-Medium'}}>NON PROFIT</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
IconCon:{
backgroundColor:'#f9a533',
width:(width/2)-20,
height:(width/2)-20,
borderRadius:3,
justifyContent:'center',
alignItems:'center'
},
con:{
    marginTop:10,
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-around',
    paddingHorizontal:8,
}
})

export default Search;