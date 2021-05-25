import React from 'react';
import { ActivityIndicator, View } from 'react-native';

function Loader(){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator
            size={30}
            color="#2092a4"
            />
        </View>
    )
}

export default Loader;
