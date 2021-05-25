import React from "react";
import {View, Text, StyleSheet, FlatList, Image} from "react-native";
import ForwardIcon from "react-native-vector-icons/Ionicons"

function List(){

    function renderNotification({item}){
        return(
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'90%',...styles.con}}>
                <View style={{width:'25%'}}>
                    <Image
                    style={{width:80,height:80}}
                    source={require('../../../../assets/campaige.jpg')}
                    />
                </View>

                <View style={{width:'50%'}}>
                <Text style={{fontSize:12,fontWeight:'700'}}>TITLE</Text>
                <Text style={{color:'gray',fontSize:12}}>
                Lorem ipsum, or lipsum as it ....
                </Text>
                </View>
                <View style={{width:'25%',justifyContent:'center',alignItems:'center'}}>
                <ForwardIcon
                name="chevron-forward"
                color="gray"
                size={30}
                />
                </View>
            </View>
        )
    }

    return(
        <View>
            <FlatList
            style={{paddingTop:20}}
            showsVerticalScrollIndicator={false}
            data={[0,1,2,1,3,3,4,4,4,4]}
            renderItem={renderNotification}
            keyExtractor={(item,i)=>i.toString()}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    con:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor:'white',
        marginLeft:'auto',
        marginRight:'auto',
        marginVertical:5
    }
})

export default List;