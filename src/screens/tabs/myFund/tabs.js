import * as React from 'react';
import { View, useWindowDimensions,Text,TouchableOpacity} from 'react-native';
import Header from "../../../components/backHeader"
import MyFund from './myFund'

export default function TabViewExample() {

  const [type,setType]=React.useState('active')

  function renderTabs(){
    if(type==="active"){
      return <MyFund type={type}/>
    }else{
      return <MyFund type={type}/>
    }
  }
  return (
      <View style={{width:'100%',flex:1}}>
        <Header
        title="my fundraisers"
        />
        <View style={{backgroundColor:'#faaf3a',width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:5}}>
          <TouchableOpacity 
          onPress={()=>setType("active")}
          style={{width:'50%'}}>
              <Text style={{width:'100%',textAlign:'center',paddingVertical:10,color:type=="active"?'white':'lightgrey'}}>Active</Text>
              {type=="active"?<View style={{width:'100%',height:3,backgroundColor:'#2092a4'}}/>:null}
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>setType("inactive")}
          style={{width:'50%'}}>
              <Text style={{width:'100%',textAlign:'center',paddingVertical:10,color:type=="inactive"?'white':'lightgrey'}}>Inactive</Text>
              {type=="inactive"?<View style={{width:'100%',height:3,backgroundColor:'#2092a4'}}/>:null}
          </TouchableOpacity>
        </View>
        {renderTabs()}
      </View> 
  );
}