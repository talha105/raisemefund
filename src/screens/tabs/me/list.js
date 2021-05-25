import React from "react";
import {View, Text, StyleSheet, TextInput,TouchableOpacity} from "react-native";
import AccountIcon from "react-native-vector-icons/FontAwesome"
import PayIcon from "react-native-vector-icons/MaterialIcons"
import OffIcon from "react-native-vector-icons/FontAwesome5"
import * as actions from "../../../store/action"
import {connect} from "react-redux"
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"
import messaging from '@react-native-firebase/messaging';

function ListMe({setUserId}){
    const navigation=useNavigation();
    return(
        <View style={styles.list}>
            <TouchableOpacity style={styles.item}
            onPress={()=>navigation.navigate('profile')}
            >
                <AccountIcon
                name="user"
                color="#f9a533"
                size={25}
                style={styles.icon}
                />
                <Text style={styles.text}>Account</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.item}>
                <PayIcon
                name="payment"
                color="#f9a533"
                size={25}
                style={styles.icon}
                />
                <Text style={styles.text}>Payment Methods</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.item}>
                <PayIcon
                name="email"
                color="#f9a533"
                size={25}
                style={styles.icon}
                />
                <Text style={styles.text}>Email Notifications</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.item}
            onPress={()=>navigation.navigate('help')}
            >
                <PayIcon
                name="help-outline"
                color="#f9a533"
                size={25}
                style={styles.icon}
                />
                <Text style={styles.text}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={async()=>{
                await AsyncStorage.removeItem('USER_ID')
                setUserId("")
                messaging()
                .unsubscribeFromTopic('weather')
                .then(() => console.log('Unsubscribed fom the topic!'));
            }}
            style={styles.item}>
                <OffIcon
                name="toggle-off"
                color="#f9a533"
                size={25}
                style={styles.icon}
                />
                <Text style={styles.text}>SignOut</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    list:{
        width:'100%',
    },
    item:{
        width:'100%',
        flexDirection:'row',
        padding:15,
        paddingLeft:30,
        borderBottomColor:'lightgray',
        borderBottomWidth:1
    },
    text:{
        fontSize:16,
        color:'gray',
    },
    icon:{
        width:'15%',
    }
})

export default connect(null,actions)(ListMe);