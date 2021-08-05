import React from 'react';
import { View,Text,Image,StyleSheet,Dimensions, Touchable, TouchableOpacity, ScrollView} from 'react-native';
import Btn from '../../components/btn';
import FillBtn from "../../components/fillBtn"

const {width,height}=Dimensions.get('window')
function Welcome({navigation}){
    return(
        <View style={styles.con}>
            <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
                <Image
                resizeMode="stretch"
                style={styles.img}
                source={require('../../../assets/childplaying.png')}
                />
                <View style={{...styles.subCon,marginLeft:'auto',marginRight:'auto'}}>
                <Image
                resizeMode="contain"
                style={styles.logo}
                source={require('../../../assets/logo.png')}
                />
                </View>
                <View style={{width:'100%',justifyContent:'space-around',alignItems:'center',height:height/2,paddingBottom:30}}>
                <View style={styles.subCon}>
                    <Text>{"The #1 and most trusted".toUpperCase()}</Text>
                    <Text style={{fontSize:20}}>{"fundraising platform".toUpperCase()}</Text>
                </View>
                <View style={styles.subCon}>
                    <FillBtn
                    call={()=>navigation.navigate('home')}
                    text="Start RMF community"
                    />
                    <Text style={{fontSize:16,color:'#545454',marginTop:20,marginBottom:20,width:'100%',textAlign:'center'}}>------------- OR -------------</Text>
                    <Btn
                    call={()=>navigation.navigate('signIn')}
                    text="sign in"
                    />
                </View>
                <View style={styles.subCon}>
                    <Text style={{textAlign:'center',color:'#545454'}}>By continuing to use RaiseMeFund, you agree to the</Text>
                    <Text style={{textAlign:'center',color:'#545454'}}>RaiseMeFund <Text style={{color:'#1d879a'}}>terms</Text> and acknowledge</Text>
                    <Text style={{textAlign:'center',color:'#545454'}}> our <Text style={{color:'#1d879a'}}>privacy</Text> notice</Text>
                </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles=StyleSheet.create({
    con:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:'100%',
        height:height/2.5
    },
    logo:{
        width:100,
        height:60,
    },
    subCon:{
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
    }
})

export default Welcome;
