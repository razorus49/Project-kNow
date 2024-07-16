import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';


//simple screen for testing purposes
const AccountDashboard = ({navigation}) => {
    return(
        <View> 
            <Text style={{fontSize:30}}> Account Dashboard </Text>
            <Button title="links to home"
            onPress={()=> navigation.navigate('Home')}/>
        </View>
    
    )
};

export default AccountDashboard
