import React,{useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';

import {getData, removeValue} from '../data/storage.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


//simple screen for testing purposes
const AccountDashboard = ({navigation}) => {

    
    const [data, setData] = useState(null)


    const refresh = async() => {
        const y = await getData()
        setData(y)
    }

    //initialize state
    useEffect(() => {
        const fetchData = async () => {
            const storedData = await getData();
            setData(storedData);
        };

        fetchData();
    }, []);
    //empty dependency array means it only runs once on mount

    return(
        <View> 
            <Text style={{fontSize:30}}> Account Dashboard </Text>
            <Text>{JSON.stringify(data)}</Text>
            <Button title="refresh" onPress={()=>refresh()}/>
            <Button title="links to home"
            onPress={()=> navigation.navigate('Home')}/>
            <Button title="reset" onPress={()=>removeValue()}/>
        </View>
    
    )
};

export default AccountDashboard
