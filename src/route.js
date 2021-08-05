import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SignIn from "./screens/auth/signIn";
import SignUp from "./screens/auth/signUp";
import Welcome from "./screens/auth/welcome";
import Home from "./screens/tabs/home/home";
import Me from "./screens/tabs/me/me";
import Notification from "./screens/tabs/notification/notification";
import MyFund from "./screens/tabs/myFund/myFund"
import HomeIcon from "react-native-vector-icons/FontAwesome5"
import HomeIcon1 from "react-native-vector-icons/Entypo"
import NotIcon from "react-native-vector-icons/Ionicons"
import MeIcon from "react-native-vector-icons/FontAwesome"
import Search from './screens/tabs/search/search';
import SearchResult from './screens/tabs/search/SearchResult';
import PlusIcon from "react-native-vector-icons/AntDesign"
import CreateCampaige from './screens/tabs/createCampaige/createCampaige';
import Donate from "./screens/tabs/home/donate"
import CampaigeDetail from "./screens/tabs/createCampaige/CampaigeDetail";
import AsyncStorage from "@react-native-community/async-storage"
import PageLoader from "./components/pageLoader"
import { connect } from 'react-redux';
import * as actions from "./store/action"
import ResetPassword from "./screens/auth/resetPassword"
import Profile from "./screens/tabs/me/profile/profile"
import Help from "./screens/tabs/me/profile/help"
import messaging from '@react-native-firebase/messaging';
import FundTabs from "./screens/tabs/myFund/tabs";
import PushNotification from "react-native-push-notification";
const Stack=createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



function HomeRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown:false}}
        />
      <Stack.Screen
        name="search"
        component={Search}
        options={{headerShown:false}}
        />
      <Stack.Screen
        name="searchResult"
        component={SearchResult}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="campaigeDetail"
        component={CampaigeDetail}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="donate"
        component={Donate}
        options={{headerShown:false}}
        />
    </Stack.Navigator>
  )
}

function MyFundRoutes(){
  return(
    <Stack.Navigator>
        <Stack.Screen
        name="fundTabs"
        component={FundTabs}
        options={{headerShown:false}}
        />
      <Stack.Screen
        name="myFund"
        component={MyFund}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="campaigeDetail"
        component={CampaigeDetail}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="donate"
        component={Donate}
        options={{headerShown:false}}
        />
    </Stack.Navigator>
  )
}

function MeRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="me"
        component={Me}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="profile"
        component={Profile}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="help"
        component={Help}
        options={{headerShown:false}}
        />
    </Stack.Navigator>
  )
}

function Tabs({initialRoute}){
    return(
      <Tab.Navigator
      activeColor="#f9a533"
      inactiveColor="#aacfd5"
      backBehavior="order"
      barStyle={{ backgroundColor: '#1d879a' }}
      initialRouteName={initialRoute}
      >
        <Tab.Screen
        name="home"
        component={HomeRoutes}
        options={{
          title:"Home",
          tabBarIcon:({color})=><HomeIcon name="home" size={20} color={color}/>
        }}
        />
        <Tab.Screen
        name="notification"
        component={Notification}
        options={{
          title:"Notification",
          tabBarIcon:({color})=><NotIcon name="notifications" size={20} color={color}/>
        }}
        />
        <Tab.Screen
        name="createCampaige"
        component={CreateCampaige}
        options={{
          title:"Create",
          tabBarIcon:({color})=><PlusIcon name="pluscircle" size={20} color={color}/>
        }}
        />
        <Tab.Screen
        name="myFund"
        component={MyFundRoutes}
        options={{
          title:"My Fundraises",
          tabBarIcon:({color})=><HomeIcon name="newspaper" size={20} color={color}/>
        }}
        />
        <Tab.Screen
        name="me"
        component={MeRoutes}
        options={{
        title:"ME",
          tabBarIcon:({color})=><MeIcon name="user" size={20} color={color}/>
        }}
        />
      </Tab.Navigator>
    )
}




function AuthRoutes(){
    return(
        <Stack.Navigator initialRouteName="welcome">
            <Stack.Screen
            name="welcome"
            component={Welcome}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="signIn"
            component={SignIn}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="resetPassword"
            component={ResetPassword}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="signUp"
            component={SignUp}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="home"
            component={HomeRoutes}
            options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}


function Routes({userId,setUserId}){
  const navigation=useRef(null)
  const [loading,setLoading]=useState(false)
  const [initialRoute, setInitialRoute] = useState('home');

  useEffect(()=>{
    renderScreens()
      messaging()
      .subscribeToTopic('weather')
      .then(() => console.log('Subscribed to topic!'));


      // PushNotification.createChannel(
      //   {
      //     channelId: "channel-id", // (required)
      //     channelName: "My channel", // (required)
      //     channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      //     playSound: false, // (optional) default: true
      //     soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      //     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      //   },
      //   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      // );
    
      // Assume a message-notification contains a "type" property in the data payload of the screen to open

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        if(navigation.current){
          navigation.current.navigate("notification")
        }
      });
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            setInitialRoute("notification"); // e.g. "Settings"
          }
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
          PushNotification.localNotification({
            channelId: "channel-id",
            channelName: "My channel",
            message:remoteMessage.notification.body,
            playSound:true,
            title:remoteMessage.notification.title,
            priority:'high',
            soundName:'default',
            
          })
        });
        return unsubscribe;
  },[])


  async function renderScreens(){
    const user_id=await AsyncStorage.getItem('USER_ID')
    if(user_id){
      setUserId(user_id)
      setLoading(true)
    }else{
      setLoading(true)
    }
  }

  function renderContent(){
    if(userId){
      return <Tabs initialRoute={initialRoute}/>
    }else{
      return <AuthRoutes/>
    }
  }

    if(loading){
      return(
        <NavigationContainer
        ref={navigation}
        >
            {renderContent()}
        </NavigationContainer>
    )
    }else{
      return(
        <PageLoader/>
      )
    }
}

function mapStateToProps({userId}){
  return {userId}
}

export default connect(mapStateToProps,actions)(Routes);

