import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
  } from 'react-native';
import { useNavigation, useRoute, getParam } from '@react-navigation/native';

const Questions = ({route, navigation}) =>{
    const {subtopicList} = route.params

    console.log('questions screen list: ', subtopicList)
    return(
        <View>
        <Text style={{fontSize:20}}> {JSON.stringify(subtopicList)} </Text>
        <Text>questions screen</Text>
        <Button title="go back" onPress={()=> navigation.goBack()}/>
        </View>
    )        
}

export default Questions