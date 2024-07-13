import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Button,

  } from 'react-native';
import Checklist from './components/Checklist.js'
//screen of topic selection


const TopicSelection = ({route, navigation}) => {
    const {key, topic} = route.params //takes parameter of selected topic
   

    // const [subtopics, setSubtopics] = useState()


    let subtopics
    //callback function to retrieve values from checklist component
    const getSubtopics =  (value) => {
        subtopics= value
        console.log(subtopics)
    }



    return(
        <ScrollView> 
            <Text style={{fontSize:30}}> {topic} </Text>
            <Checklist topic={topic} valueGetter={getSubtopics}/>
            <Button title="links to home"
            onPress={()=> navigation.goBack()}/>
            <Button title="proceed"
            onPress={()=> navigation.navigate('Questions', {subtopicList: subtopics})}/>
        </ScrollView>
    )
};

export default TopicSelection
