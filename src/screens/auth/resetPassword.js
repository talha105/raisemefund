import React, { useState } from 'react';
import { View,Text,Image,StyleSheet,Dimensions, Touchable, TouchableOpacity, BackHandler, ImageBackground, TextInput, Modal} from 'react-native';
import Header from '../../components/backHeader';
import InputField from "../../components/InputField";
import MailIcon from "react-native-vector-icons/MaterialCommunityIcons"
import PassIcon from "react-native-vector-icons/Ionicons"
import FillBtn from '../../components/fillBtn';
import BackIcon from "react-native-vector-icons/Ionicons";
import Password from "../../components/password"
import LoaderBtn from '../../components/Loader';
import { connect } from 'react-redux';
import * as actions from "../../store/action";
import SuccessModel from "../../components/succesModel"

const {width,height}=Dimensions.get('window')
function ResetPassword({navigation,login,setUserId,resetPassword}){
    const [fields,setFields]=useState({
        email:"",
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
    const [model, setModel]=useState(false)
    const [error,setError]=useState("")
    
    function renderLoader(con){
        if(con==="show"){
            setLoading(true)
        }
        if(con==="hide"){
            setLoading(false)
        }
    }

    function renderModel(con){
        if(con==="show"){
            setModel(true)
        }
        if(con==="hide"){
            setModel(false)
        }
    }
    return(
        <View style={{flex:1}}>
            <Header
            title="RESET PASSWORD"
            back={true}
            />
            <SuccessModel
            visible={model}
            closeModle={()=>renderModel('hide')}
            title="Reset password link sent on your email id and will be expired in 60 minutes"
            reDirect={()=>navigation.push('signIn')}
            />
            <View style={{flex:1,justifyContent:'space-between'}}>
            <View style={{justifyContent:'center',alignItems:'center',paddingTop:20}}>
                <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../../assets/logo.png')}
                />
            </View>
            <View style={styles.con}>
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
                {!fields.email.includes('@') && fields.email.length?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Invalid Email</Text>:null}
                {error && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>{error}</Text>:null}
            </View>
            <View style={styles.con}>
                {
                    loading?(
                        <LoaderBtn/>
                    ):

                    (
                        <FillBtn
                        call={()=>{
                            setSubmit(true)
                            if(fields.email && fields.email.includes('@')){
                                renderLoader('show')
                                resetPassword(fields.email,renderLoader).then((res)=>{
                                    console.log(res)
                                    if(res.api_status=="true"){
                                        renderModel("show")
                                        renderLoader('hide')
                                    }else{
                                        setError(res.message)
                                        renderLoader('hide')
                                    }
                                })
                            }
                        }}
                        text="Sign in"
                        />
                    )
                }
            </View>
            <View style={{height:height/3}}>
                <ImageBackground
                resizeMode="stretch"
                style={{width:'100%',flex:1,justifyContent:'center',alignItems:'center'}}
                source={require('../../../assets/footer.png')}
                >
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('signUp')}
                        >
                            <BackIcon
                            name="arrow-forward-circle-outline"
                            color="white"
                            size={50}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('signUp')}
                        >
                            <Text style={{color:'white'}}>Don't Have an Account?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('signUp')}
                        >
                            <Text style={{color:'white',fontSize:20,fontWeight:'700'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>

            </View>
            
        </View>
    )
}
const styles=StyleSheet.create({
    img:{
        width:250,
        height:120
    },
    con:{
        width:'85%',
        marginLeft:'auto',
        marginRight:'auto',
    }

})


export default connect(null,actions)(ResetPassword);
