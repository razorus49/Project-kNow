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

console.log(dummyQuestionsJSON)
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
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [next, setNext] = useState(false)

    const handleAnswer = (answer) => {
        console.log('handle answer triggered, option is', answer)
        const isCorrect = answer === dummyQuestions[currentQuestion].answer

        if(isCorrect){
            setScore(score+1)
            console.log('is correct')
        }

        const nextQuestion = currentQuestion + 1

        if(nextQuestion < dummyQuestions.length){
            setCurrentQuestion(nextQuestion) 
        }
        else{
            console.log('quiz is over')
        }

    }

   
    return(
        <View>
        <Text style={{fontSize:20}}> {JSON.stringify(selected_subtopics)} </Text>
        <Text>questions screen</Text>
        {/* <Question question={" How do you write 'Hello World' in an alert box?"}
         options={["msgBox('Hello World');","alertBox('Hello World');","msg('Hello World');","alert('Hello World');"]} /> */}
        <Question question={dummyQuestions[currentQuestion].question} options={dummyQuestions[currentQuestion].options} handleAnswer={handleAnswer}/>
        <Text>score: {score}</Text>
        <Button title="go back" onPress={()=> navigation.goBack()}/>
        </View>
    )        
}

export default Questions