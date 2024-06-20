import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';

  
const TopicSelection = ({route, navigation}) => {
    const {key, topic} = route.params 

    // console.log('topic is ', topic)
    return(
        <View> 
            <Text style={{fontSize:80}}> {topic} </Text>
            <Button title="links to home"
            onPress={()=> navigation.goBack()}/>
        </View>
    
    )
};

export default TopicSelection
