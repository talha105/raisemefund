import React, { useEffect, useMemo, useState } from 'react';
import { View,Text,Image,StyleSheet,Dimensions, Touchable, TouchableOpacity, BackHandler, ImageBackground, TextInput, Keyboard, ScrollView} from 'react-native';
import Header from '../../../components/backHeader';
import InputField from "../../../components/InputField";
import UserIcon from "react-native-vector-icons/FontAwesome"
import PassIcon from "react-native-vector-icons/Ionicons"
import MailIcon from "react-native-vector-icons/MaterialCommunityIcons"
import FillBtn from '../../../components/fillBtn';
import BackIcon from "react-native-vector-icons/Ionicons";
import Password from "../../../components/password"
import LoaderBtn from '../../../components/Loader';
import PhoneInput from "react-native-phone-number-input";
import DollarIcon from "react-native-vector-icons/FontAwesome"
import CountryPicker from 'react-native-country-picker-modal'
import { connect } from 'react-redux';
import * as actions from "../../../store/action";
import SuccessModal from "../../../components/succesModel"
import SuccessModel from '../../../components/succesModel';

const {width,height}=Dimensions.get('window')
function Donation({navigation,route,donateNow,getProfile,userId,profile}){

    useEffect(()=>{
        if(userId){
            getProfile(userId)
        }
    },[])

    setFieldsMemo=useMemo(()=>{
        if(profile.email){
            console.log("profile")
        }
    },[profile])
    
    const [fields,setFields]=useState({
        first_name:"",
        last_name:"",
        donated_amount:"",
        is_anonymous:0,
        email:"",
        country:"united states",
        zip_code:""
    })
    function getValue(k,v){
        setFields((pS)=>{
            return{
                ...pS,
                [k]:v
            }
        })
    }
    const [submit,setSubmit]=useState(false)
    const [loading,setLoading]=useState(false)
    const [valid, setValid] = useState(false);
    
    function renderLoader(con){
        if(con==="show"){
            setLoading(true)
        }
        if(con==="hide"){
            setLoading(false)
        }
    }


    const [countryCode, setCountryCode] = useState('US')
    const [country, setCountry] = useState('')
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        getValue('country',country.name)
      }

      const [modal,setModal]=useState(false)

      function renderModal(con){
        if(con==="show"){
            setModal(true)
        }
        if(con==="hide"){
            setModal(false)
        }
      }


    return(
        <ScrollView style={styles.con}>
            <Header
            title="DONATION"
            back={true}
            />
            <SuccessModel
            visible={modal}
            closeModle={()=>renderModal('hide')}
            reDirect={()=>navigation.jumpTo('home')}
            title="SuccesFully Donated"
            />
            <View style={{flex:1,justifyContent:'space-between'}}>
            <View style={styles.con}>
                <View style={styles.donate}>
                    <TextInput
                    keyboardType="number-pad"
                    value={fields.donated_amount}
                    onChangeText={(v=>{
                        getValue('donated_amount',v)
                        if(v.length>7){
                            Keyboard.dismiss()
                            getValue('donated_amount',"")
                        }
                    })}
                    style={styles.amount}
                    placeholder="AMOUNT"
                    />
                    <DollarIcon
                    name="dollar"
                    color="green"
                    size={40}
                    />
                </View>
                {!fields.donated_amount && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                <InputField
                getValue={(v)=>getValue('first_name',v)}
                icon={()=>{
                    return(
                        <UserIcon
                        name="user"
                        color="gray"
                        size={20}
                        />
                    )
                }}
                placeHolder="First Name"
                />
                {!fields.first_name && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                <InputField
                getValue={(v)=>getValue('last_name',v)}
                icon={()=>{
                    return(
                        <UserIcon
                        name="user"
                        color="gray"
                        size={20}
                        />
                    )
                }}
                placeHolder="Last Name"
                />
                {!fields.last_name && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                <InputField
                getValue={(v)=>getValue('email',v)}
                icon={()=>{
                    return(
                        <MailIcon
                        name="email-mark-as-unread"
                        color="gray"
                        size={20}
                        />
                    )
                }}
                placeHolder="Email Address"
                />
                {!fields.email && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                <View style={{marginVertical:12,borderBottomWidth:1,borderBottomColor:'gray',paddingBottom:10}}>
                <CountryPicker
                countryCode={countryCode}
                withCountryNameButton
                withFlag
                withFilter
                withAlphaFilter
                withEmoji
                visible={false}
                onSelect={onSelect}
                
                />
                </View>
                {!fields.country && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Select</Text>:null}
                <InputField
                getValue={(v)=>getValue('zip_code',v)}
                keyboardType="number"
                icon={()=>{
                    return(
                        <MailIcon
                        name="email-mark-as-unread"
                        color="gray"
                        size={20}
                        />
                    )
                }}
                placeHolder="Zip Code"
                />
                {!fields.zip_code && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                {
                    loading?(
                        <View style={{marginTop:20}}>
                        <LoaderBtn color="#faaf3a"/>
                        </View>
                    ):

                    (   <View style={{marginTop:20}}>
                        <FillBtn
                        color="#f9a533"
                        call={()=>{
                            setSubmit(true)
                            if(fields.first_name && fields.last_name && fields.email && fields.country && fields.zip_code && fields.donated_amount){
                                renderLoader('show')
                                donateNow({...fields,campaign_id:route.params},renderLoader,renderModal)
                                setSubmit(false)
                            }
                        }}
                        text="DOnate now"
                        />
                        </View>
                    )
                }
            </View>
            </View>
            
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    img:{
        width:250,
        height:120
    },
    con:{
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
        flex:1
    },
    donate:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1.5,
        borderColor:'green',
        borderRadius:7,
        paddingVertical: 20,
    },
    amount:{
        fontSize:35,
        marginRight:15,
        fontFamily:'Poppins-Bold',
        color:'green',
        width:'70%',
        includeFontPadding:false
    }


})

function mapStateToProps({userId,profile}){
    return {userId,profile}
}

export default connect(mapStateToProps,actions)(Donation);
