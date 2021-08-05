import React, { useEffect, useMemo, useState } from 'react';
import { View,Text,Image,StyleSheet,Dimensions, Touchable, TouchableOpacity, BackHandler, ImageBackground, TextInput} from 'react-native';
import Header from '../../components/backHeader';
import InputField from "../../components/InputField";
import MailIcon from "react-native-vector-icons/MaterialCommunityIcons"
import PassIcon from "react-native-vector-icons/Ionicons"
import FillBtn from '../../components/fillBtn';
import BackIcon from "react-native-vector-icons/Ionicons";
import Password from "../../components/password"
import LoaderBtn from '../../components/Loader';
import { connect } from 'react-redux';
import * as actions from "../../store/action"

const {width,height}=Dimensions.get('window')
function SignIn({navigation,login,setUserId,user}){
    const [fields,setFields]=useState({
        email:"",
        password:"",
    })
    const [serverError,setServerError]=useState("");

    useEffect(()=>{
        return navigation.addListener('focus',()=>{
            setServerError("")
        })
    },[navigation])

    const errorUseMemo=useMemo(()=>{
        if(user.message){
            setServerError(user.message)
        }
    },[user])
    
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
    
    function renderLoader(con){
        if(con==="show"){
            setLoading(true)
        }
        if(con==="hide"){
            setLoading(false)
        }
    }
    return(
        <View style={{flex:1}}>
            <Header
            title="sign-in"
            back={true}
            />
            <View style={{flex:1,justifyContent:'space-between'}}>
            <View style={{paddingTop:20, justifyContent:'center',alignItems:'center'}}>
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
                <Password
                getValue={(v)=>getValue('password',v)}
                icon={()=>{
                    return(
                        <PassIcon 
                        name="md-keypad-sharp"
                        color="gray"
                        size={20}
                        />
                    )
                }}
                placeHolder="Password"
                />
                {!fields.password && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
            <TouchableOpacity
            onPress={()=>navigation.navigate('resetPassword')}
            >
                <Text style={{width:'100%',textAlign:'right',marginTop:5,fontSize:12,color:'#2092a4'}}>FORGET PASSWORD</Text>
            </TouchableOpacity>
            </View>
            {serverError?<Text style={{textAlign:'center',color:'red'}}>{serverError}</Text>:null}
            <View style={styles.con}>
                {
                    loading?(
                        <LoaderBtn/>
                    ):

                    (
                        <FillBtn
                        call={()=>{
                            setSubmit(true)
                            if(fields.password && fields.email){
                                renderLoader('show')
                                login(fields,renderLoader,setUserId)
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

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps,actions)(SignIn);
