import React, { useState } from 'react';
import { View,Text,Image,StyleSheet,Dimensions, Touchable, TouchableOpacity, BackHandler, ImageBackground, TextInput, ScrollView} from 'react-native';
import Header from '../../components/backHeader';
import InputField from "../../components/InputField";
import UserIcon from "react-native-vector-icons/FontAwesome"
import PassIcon from "react-native-vector-icons/Ionicons"
import MailIcon from "react-native-vector-icons/MaterialCommunityIcons"
import FillBtn from '../../components/fillBtn';
import BackIcon from "react-native-vector-icons/Ionicons";
import Password from "../../components/password"
import LoaderBtn from '../../components/Loader';
import PhoneInput from "react-native-phone-number-input";
import { connect } from 'react-redux';
import * as actions from "../../store/action";
import SuccessModel from "../../components/succesModel"
import OrganIcon from "react-native-vector-icons/Octicons";
import AddressIcon from "react-native-vector-icons/Entypo";


const {width,height}=Dimensions.get('window')
function SignUp({navigation,registration}){
    const [fields,setFields]=useState({
        name:"",
        organization:"",
        address:""
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
    const [model,setModel]=useState(false);
    
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
            title="sign-Up"
            back={true}
            />
            <SuccessModel
            title="successfully registered"
            visible={model}
            closeModle={()=>renderModel('hide')}
            reDirect={()=>navigation.navigate('signIn')}
            />
            <View style={{flex:1,justifyContent:'space-between'}}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.con}>
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
                <InputField
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
                placeHolder="Organization"
                />
                {!fields.organization && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                <InputField
                getValue={(v)=>getValue('address',v)}
                icon={()=>{
                    return(
                        <AddressIcon
                        name="location"
                        color="gray"
                        size={20}
                        />
                    )
                }}
                placeHolder="Address"
                />
                {!fields.address && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
                <View>
                <PhoneInput
                    
                    containerStyle={{backgroundColor:'rgba(0, 0, 0, 0)',width:'100%',padding:0,borderBottomWidth:1,borderBottomColor:'gray'}}
                    codeTextStyle={{color:'gray'}}
                    textInputStyle={{color:'gray',justifyContent:'center',alignItems:'center'}}
                    textContainerStyle={{backgroundColor:'rgba(0, 0, 0, 0)',paddingVertical:0}}
                    defaultValue={fields.phoneNumber}
                    defaultCode="DM"
                    layout="first"
                    onChangeText={(text) => {
                    setValid(text)
                    }}
                    onChangeFormattedText={(text) => {
                        getValue('phone_number',text)
                    }}
                    withDarkTheme={false}
                    withShadow={false}
                    autoFocus={false}
                    />
                </View>
                {!valid && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
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
            
                {
                    loading?(
                        <LoaderBtn/>
                    ):

                    (
                        <View style={{marginVertical:20}}>
                            <FillBtn
                            call={()=>{
                                setSubmit(true)
                                if(fields.password && fields.email && valid && fields.first_name && fields.last_name && fields.address && fields.organization){
                                    renderLoader('show')
                                    registration(fields,renderLoader,renderModel)
                                }
                            }}
                            text="Sign Up"
                            />
                        </View>
                    )
                }
            </ScrollView>
            <View style={{height:height/3.5}}>
                <ImageBackground
                resizeMode="stretch"
                style={{width:'100%',flex:1,justifyContent:'center',alignItems:'center'}}
                source={require('../../../assets/footer.png')}
                >
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('signIn')}
                        >
                            <BackIcon
                            name="arrow-forward-circle-outline"
                            color="white"
                            size={50}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('signIn')}
                        >
                            <Text style={{color:'white'}}>Don't Have an Account?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('signIn')}
                        >
                            <Text style={{color:'white',fontSize:20,fontWeight:'700'}}>Sign In</Text>
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
        flex:1,
        width:'85%',
        marginLeft:'auto',
        marginRight:'auto',
    }

})

function mapStateToProps(){
    return {user:7}
}

export default connect(mapStateToProps,actions)(SignUp);
