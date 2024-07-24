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
import data from './data/dummyTopicQ.json'

const TopicSelection = ({route, navigation}) => {
    const {key, topic} = route.params //takes parameter of selected topic
    const [number, setNumber] = useState('')
    const [subtopics, setSubtopics] = useState('a')
    const [errorMsg, setErrorMsg] = useState('')
    // const [subtopics, setSubtopics] = useState()

    //callback function to retrieve values from checklist component
    const getSubtopics =  (value) => {
        setSubtopics(value)
    }
    
    const getRandomQuestions = (selected_subtopics)=> {
        let QuestionListByTopic = JSON.parse(JSON.stringify(data))[topic]
        let dummyQuestionList = []
        let correctAnswers=[]

        const equalParts = Math.floor(Number(number)/selected_subtopics.length)
        const r = Number(number) % selected_subtopics.length


        
        const randomQuestion = (listLength) => {
            let num = Math.floor(Math.random() * listLength)
            return num        
        }

        for(let i=0;i<selected_subtopics.length;++i){

            //uses nested loop instead of slicing so it does not return an array but instead individual objects
            let j=0
            for(j;j<equalParts;++j){
                let randomNumber = randomQuestion(QuestionListByTopic[selected_subtopics[i]].length)
                dummyQuestionList.push(QuestionListByTopic[selected_subtopics[i]][randomNumber]) 
                correctAnswers.push(QuestionListByTopic[selected_subtopics[i]][randomNumber].answer) 
                
            }

            if(i<r){
                let randomNumber = randomQuestion(QuestionListByTopic[selected_subtopics[i]].length)
                dummyQuestionList.push(QuestionListByTopic[selected_subtopics[i]][randomNumber])
                correctAnswers.push(QuestionListByTopic[selected_subtopics[i]][randomNumber].answer) 
            }
            //function to select questions randomly to be added later
        }

        return [dummyQuestionList, correctAnswers]
    }
    const proceed = () => {
        let selected_subtopics = []

        //extract all the selected subtopics 
        for(let i=0;i<subtopics.length;++i){
            if (subtopics[i].selected) {
                selected_subtopics.push(subtopics[i].subtopic_text)
            }
        }
        
        if(selected_subtopics.length >=1 && number != '') {
            let QuestionListByTopic = JSON.parse(JSON.stringify(data))[topic]
            const [QuestionList, correctAnswers] = getRandomQuestions(selected_subtopics)
            navigation.navigate('Questions', {questionList:QuestionList, correctAnswers:correctAnswers, number:number})
        }
        else if(number===''){
            setErrorMsg('please enter number of questions')
        }
        else if(selected_subtopics.length <1){
            setErrorMsg('please select atleast one subtopic')
        }
    
    }
    

    return(
        <ScrollView> 
            <Text style={{fontSize:30}}> {topic} </Text>
            <Checklist topic={topic} valueGetter={getSubtopics}/>

            <TextInput style={styles.input} onChangeText={setNumber} value={number} placeholder='input no. of questions' placeholderTextColor="black" keyboardType="numeric"/>
            <Text>{errorMsg}</Text>
            <Button title="links to home"
            onPress={()=> navigation.goBack()}/>
            <Button title="proceed"
            onPress={()=> proceed()}/>
            <Text>number: {number}</Text>
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
