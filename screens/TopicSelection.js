import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Button,
    TextInput,
  } from 'react-native';
import Checklist from './components/Checklist.js'
//screen of topic selection


const TopicSelection = ({route, navigation}) => {
    const {key, topic} = route.params //takes parameter of selected topic
    const [number, setNumber] = useState('')
    const [subtopics, setSubtopics] = useState('a')
    // const [subtopics, setSubtopics] = useState()

    //callback function to retrieve values from checklist component
    const getSubtopics =  (value) => {
        setSubtopics(value)
    }

    const proceed = () => {
        let selected_subtopics = []

        //extract all the selected subtopics 
        for(let i=0;i<subtopics.length;++i){
            if (subtopics[i].selected) {
                selected_subtopics.push(subtopics[i].subtopic_text)
            }
        }
        
        if(selected_subtopics.length >=1) {
            navigation.navigate('Questions', {subtopicList: subtopics, topic:topic, number:number})
        }
        else{
            console.log('please select subtopic ')
        }
    }
    return(
        <ScrollView> 
            <Text style={{fontSize:30}}> {topic} </Text>
            <Checklist topic={topic} valueGetter={getSubtopics}/>

            <TextInput style={styles.input} onChangeText={setNumber} value={number} placeholder='input no. of questions' keyboardType="numeric"/>
            <Button title="links to home"
            onPress={()=> navigation.goBack()}/>
            <Button title="proceed"
            onPress={()=> proceed()}/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
export default TopicSelection
