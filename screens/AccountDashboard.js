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
            <Text style={{font:50}}> Account Dashboard in git folder </Text>
            <Button title="links to home"
            onPress={()=> navigation.navigate('Home')}/>
        </View>
    
    )
};

export default AccountDashboard
