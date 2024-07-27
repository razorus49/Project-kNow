import React,{useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('test');
      if (value !== null) {
        // value previously stored
        console.log('value previously stored', value)
        return value
      }
    } catch (e) {
      // error reading value
      console.log('error')
    }
  };

//simple screen for testing purposes
const AccountDashboard = ({navigation}) => {
    const [data, setData] = useState(null)


    const refresh = () => {
        const x = getData()
        setData(x)
        console.log('x is ', x)
        console.log('data is', data)
    }
    return(
        <View> 
            <Text style={{fontSize:30}}> Account Dashboard </Text>
            <Text>{data}</Text>
            <Button title="refresh" onPress={()=>refresh()}/>
            <Button title="links to home"
            onPress={()=> navigation.navigate('Home')}/>
        </View>
    
    )
};

export default AccountDashboard
