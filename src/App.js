import React, { Component, useEffect } from 'react';
import { View, Text ,Alert} from 'react-native';
import {connect, Provider} from "react-redux"
import store from "./store/index";
import Routes from "./route";
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';


function App(){
  useEffect(()=>{
    SplashScreen.hide();
    requestUserPermission()

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived! sdjflsdkjfl;ksdjwerwe', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
    
  },[])

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      const token=await messaging().getToken()
      console.log(token)
    }
  }
  return (
    <Provider store={store}>
      <View style={{flex:1}}>
      <Routes/>
    </View>
    </Provider>
  );
}

export default App
