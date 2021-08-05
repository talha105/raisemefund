import React, { useEffect, useMemo, useState } from "react";
import {View,Text, TextInput, StyleSheet, FlatList, ImageBackground,Dimensions, Image, ScrollView} from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity} from 'react-native-gesture-handler'
import Header from "../../../../components/backHeader"
import * as actions from "../../../../store/action"
import InputField from "../../../../components/InputField";
import UserIcon from "react-native-vector-icons/FontAwesome"
import MailIcon from "react-native-vector-icons/MaterialCommunityIcons"
import BackIcon from "react-native-vector-icons/Ionicons";
import OrganIcon from "react-native-vector-icons/Octicons";
import PhoneIcon from "react-native-vector-icons/Entypo";
import EditIcon from "react-native-vector-icons/FontAwesome5";
import FillBtn from "../../../../components/fillBtn";
import ImageModel from "../../../../components/imagePikerModel";
import ImagePicker from 'react-native-image-crop-picker';
import SuccessModel from "../../../../components/succesModel"
import LoaderBtn from "../../../../components/Loader";
import Loader from "../../../../components/pageLoader";
const {height,width}=Dimensions.get('window')

function Profile({navigation,getProfile,profile,userId,updateProfile}){

    const [fields,setFields]=useState({})
    const [model,setModel]=useState(false)
    const [sucModel,setSucModel]=useState(false)
    const [img,setImg]=useState(false)
    const [loading,setLoading]=useState(false)
    const [submit,setSubmit]=useState(false)
    const [pageLoading,setPageLoading]=useState(true)

    useEffect(()=>{
        getProfile(userId).then(()=>setPageLoading(false))
    },[])

    const profileMemo=useMemo(()=>{
        setFields(profile)
    },[profile])


    function getValue(k,v){
        setFields((pS)=>{
            return{
                ...pS,
                [k]:v
            }
        })
    }

    function OpenLibrary(){
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
          }).then(image => {
            renderImageModel(false)
            getValue('profile_picture',image)
            setImg(image.path)
          });
      }

      function OpenCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
          }).then(image => {
            renderImageModel(false)
            getValue('profile_picture',image)
            setImg(image.path)
            
          })
      }

      function renderImageModel(con){
        if(con){
          setModel(true)
        }
        else{
          setModel(false)
        }
      }
      function renderSucModel(con){
        if(con){
          setSucModel(true)
        }
        else{
          setSucModel(false)
        }
      }
      function renderLoader(con){
        if(con){
            setLoading(true)
          }
          else{
            setLoading(false)
          }
      }
    if(pageLoading){
        return <Loader/>
    }else{
        return(
            <View style={{flex:1}}>
                <Header
                title="PROFILE"
                back={true}
                />
                <ImageModel
                visible={model}
                closeModle={()=>renderImageModel(false)}
                goToCamera={OpenCamera}
                goToGallery={OpenLibrary}
                />
                <SuccessModel
                visible={sucModel}
                title="Successfully Updated"
                closeModle={()=>renderSucModel(false)}
                />
                <ScrollView style={{flex:1,marginBottom:20}}>
                    <ImageBackground 
                    style={{width:'100%',height:height/3.5}}
                    source={require('../../../../../assets/profile.png')}>
                    <View style={{paddingTop:30}}>
                    <Text style={styles.title}>
                        {fields.name}
                    </Text>
                    <Text style={{...styles.title,fontSize:14,textTransform:'none',paddingTop:0}}>
                        {fields.email}
                    </Text>
                    </View>
                    <View style={styles.imgCon}>
                    <Image
                    style={styles.img}
                    source={{uri:img?img:fields.image}}
                    />
                    <TouchableOpacity 
                    onPress={()=>renderImageModel(true)}
                    style={{justifyContent:'center',alignItems:'center',backgroundColor:'black',flexDirection:'row'}}>
                        <EditIcon
                        name="edit"
                        color="#ffffff"
                        size={12}
                        />
                        <Text style={{color:'white',fontSize:12,marginLeft:5, padding:2}}>Edit</Text>
                    </TouchableOpacity>
                    </View>
                    </ImageBackground>
                    <View style={{width:"90%",marginLeft:'auto',marginRight:'auto',marginTop:70}}>
                        <View>
                            <InputField
                            value={fields.name}
                            defaultValue={fields.name}
                            getValue={(v)=>getValue('name',v)}
                            icon={()=>{
                                return(
                                    <UserIcon
                                    name="user"
                                    color="gray"
                                    size={20}
                                    />
                                )
                            }}
                            />
                            {!fields.name && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                        </View>
                        <View>
                            <InputField
                            defaultValue={fields.organization}
                            getValue={(v)=>getValue('organization',v)}
                            icon={()=>{
                                return(
                                    <OrganIcon
                                    name="organization"
                                    color="gray"
                                    size={20}
                                    />
                                )
                            }}
                            />
                            {!fields.organization && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                        </View>
                        {/* <View>
                            <InputField
                            defaultValue={fields.phone}
                            getValue={(v)=>getValue('phone',v)}
                            getValue={(v)=>getValue('phone',v)}
                            icon={()=>{
                                return(
                                    <PhoneIcon
                                    name="phone"
                                    color="gray"
                                    size={20}
                                    />
                                )
                            }}
                            />
                        </View> */}
                        <View>
                            <InputField
                            defaultValue={fields.address}
                            getValue={(v)=>getValue('address',v)}
                            getValue={(v)=>getValue('address',v)}
                            icon={()=>{
                                return(
                                    <PhoneIcon
                                    name="location"
                                    color="gray"
                                    size={20}
                                    />
                                )
                            }}
                            />
                            {!fields.address && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                        </View>
                        <View style={{marginTop:20}}>
                        {loading?<LoaderBtn color="#1d879a"/>:(
                            <FillBtn
                            call={()=>{
                                setSubmit(true)
                                if(fields.name && fields.organization && fields.address){
                                    setSubmit(false)
                                    renderLoader(true)
                                    updateProfile({...fields,user_id:userId},renderSucModel,renderLoader)
                                }
                            }}
                            text="update"
                            />
                        )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    title:{
        color:'white',
        textTransform:'uppercase',
        width:'100%',
        paddingTop:10,
        textAlign:'center',
        fontSize:22
    },
    img:{
        width:140,
        height:140,
        shadowColor: "#000",
        
    },
    imgCon:{
        position:'relative',
        top:20,
        marginLeft:'auto',
        marginRight:'auto',
        shadowColor: "#000",
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

    }
})

function mapStateToProps({userId,profile}){
    return {userId,profile}
}

export default connect(mapStateToProps,actions)(Profile);