import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
  } from 'react-native';
import Checklist from "C:/Users/Illuminatus/projects/git/know-now/components/Checklist.js"


//screen of topic selection
const TopicSelection = ({route, navigation}) => {
    const {key, topic} = route.params //takes parameter of selected topic

    //goal is to return a checklist corresponding to the selected topic
    return(
        <View> 
            <Text style={{fontSize:30}}> {topic} </Text>
            <Checklist topic={topic}/>
            <Button title="links to home"
            onPress={()=> navigation.goBack()}/>
        </View>
    )
};

export default TopicSelection
