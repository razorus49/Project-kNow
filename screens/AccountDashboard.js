import React,{useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';

import {getData} from '../data/storage.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


//simple screen for testing purposes
const AccountDashboard = ({navigation}) => {
    const [data, setData] = useState(null)


    const refresh = async() => {
        const x = await getData('test')
        setData(x)
        console.log('data is', data)
    }
    return(
        <View> 
            <Text style={{fontSize:30}}> Account Dashboard </Text>
            <Text>{JSON.stringify(data)}</Text>
            <Button title="refresh" onPress={()=>refresh()}/>
            <Button title="links to home"
            onPress={()=> navigation.navigate('Home')}/>
        </View>
    
    )
};

export default AccountDashboard
