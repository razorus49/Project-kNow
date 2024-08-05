import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Button,
    TextInput,
  } from 'react-native';
import Checklist from '../components/Checklist.js'
import data from '../data/QuestionList.json'
import questionGenerator from '../data/questionGenerator.js'


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
        let QuestionList = []
        let subtopicList = []
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
                const randomNumber = randomQuestion(QuestionListByTopic[selected_subtopics[i]].length)
                console.log('random number', randomNumber)
                const question = QuestionListByTopic[selected_subtopics[i]][randomNumber]
                console.log("something")
                console.log(question)
                // console.log(question["function"])

                let val = question
                
                //check if question requires a generator function
                if(question.function!=null){
                    val = questionGenerator[question["function"]]() 
                }

                QuestionList.push(val) 
                correctAnswers.push(val.answer) 
                subtopicList.push(selected_subtopics[i])
            }

            if(i<r){
                let randomNumber = randomQuestion(QuestionListByTopic[selected_subtopics[i]].length)
                const question = QuestionListByTopic[selected_subtopics[i][randomNumber]]
                let val = question
                
                
                if(question.function!=null){
                    val = questionGenerator[question.function]() 
                }

                QuestionList.push(val)
                correctAnswers.push(val.answer)
                subtopicList.push(selected_subtopics[i]) 
            }
        }

        return [QuestionList, correctAnswers, subtopicList]
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
            const [QuestionList, correctAnswers, subtopicList] = getRandomQuestions(selected_subtopics)
            navigation.navigate('Questions', {questionList:QuestionList, correctAnswers:correctAnswers, number:number, subtopicList:subtopicList})
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
