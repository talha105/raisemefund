import React, { Component, useEffect } from 'react';
import { View , SafeAreaView} from 'react-native';
import {connect, Provider} from "react-redux"
import store from "./store/index";
import Routes from "./route";
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import GlobalFont from 'react-native-global-font'

function App(){
  useEffect(()=>{
    SplashScreen.hide();
    GlobalFont.applyGlobal("Poppins-Regular")
    requestUserPermission()
    
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
      <SafeAreaView style={{flex:1}}> 
        <Provider store={store}>
          <View style={{flex:1}}>
          <Routes/>
        </View>
        </Provider>
      </SafeAreaView>
  );
}
export default App;


