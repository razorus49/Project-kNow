import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
import { useNavigation, useRoute, getParam } from '@react-navigation/native';
import Question from './components/Question.js'
import dummyQuestionsJSON from './questions.json' 

//dummy questions for testing

let dummyQuestions = JSON.parse(JSON.stringify(dummyQuestionsJSON)).dummyQuestionsJSON

const Questions = ({route, navigation}) =>{
    const {subtopicList} = route.params

    let selected_subtopics = []

    //extract all the selected subtopics
    for(let i=0;i<subtopicList.length;++i){
        if (subtopicList[i].selected) {
            selected_subtopics.push(subtopicList[i].subtopic_text)
        }
    }


    //can update questions in real time by changing state
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [selected, setSelected] = useState(null)

    const onSelect = (id) => {
       setSelected(id)
       console.log(id)
    }

    const handleAnswer = (answer) => {

        const isCorrect = answer === dummyQuestions[currentQuestion].answer

        //uses another variable x because the state of score updates 
        //outside this function, so it cannot be passed correctly with navigation

        let x=0
        if(isCorrect){
            x = score+1
            setScore(x)
            console.log('score is', score)
        }

        const nextQuestion = currentQuestion + 1

        if(nextQuestion < dummyQuestions.length){
            setCurrentQuestion(nextQuestion) 
        }
        else{
            navigation.navigate('Feedback', {'score': x, 'length':dummyQuestions.length})
            //go back to home page when quiz is over
        }
        setSelected(null)
    }

   
    return(
        <View>
            <Text style={{fontSize:20}}> {JSON.stringify(selected_subtopics)} </Text>
            <Text>questions screen</Text>

            <Question question={dummyQuestions[currentQuestion].question} options={dummyQuestions[currentQuestion].options} selected={selected} onSelect={onSelect}/>
            <Text>score: {score}</Text>
            <Button title="next question" onPress={()=>handleAnswer(selected)}/>
            <Button title="go back" onPress={()=> navigation.goBack()}/>
        
        </View>
    )        
}

export default Questions