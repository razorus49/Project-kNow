import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
import { useNavigation, useRoute, getParam } from '@react-navigation/native';
import Question from './components/Question.js'
import dummyQuestionsJSON from './data/questions.json' 
import data from './data/dummyTopicQ.json'
//dummy questions for testing

let dummyQuestions = JSON.parse(JSON.stringify(dummyQuestionsJSON)).dummyQuestionsJSON

const Questions = ({route, navigation}) =>{
    const subtopicList = route.params.subtopicList
    const topic =route.params.topic

    let selected_subtopics = []

    //extract all the selected subtopics 
    for(let i=0;i<subtopicList.length;++i){
        if (subtopicList[i].selected) {
            selected_subtopics.push(subtopicList[i].subtopic_text)
        }
    }
    
    //extract relevant questions from data
    let QuestionListByTopic = JSON.parse(JSON.stringify(data))[topic]
    let dummyQuestionList = []
    for(let i=0;i<selected_subtopics.length;++i){
        dummyQuestionList.push(QuestionListByTopic[selected_subtopics[i]][0]) 
        
        //0th index for testing purposes
        //function to select questions randomly to be added later
    }

    //can update questions in real time by changing state
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val)
    let selected_arr = initializeArrayWithValues(selected_subtopics.length, '')

    const [selected, setSelected] = useState(selected_arr)

    //id refers to option 1,2,3 or 4
    const onSelect = (id) => {
        let temp_arr = [...selected]
        temp_arr[currentQuestion] = id
        setSelected(temp_arr)
    }

    const handleAnswer = (answer) => {

        const isCorrect = (answer[currentQuestion]+1) === dummyQuestionList[currentQuestion].answer
        console.log('answers:', answer, dummyQuestionList[currentQuestion].answer )
        console.log('answer is correct?', isCorrect)
        console.log('current question (handle ans): ', currentQuestion)
        //uses another variable x because the state of score updates 
        //outside this function, so it cannot be passed correctly with navigation

        const nextQuestion = currentQuestion + 1

        if(nextQuestion < dummyQuestionList.length){
            setCurrentQuestion(nextQuestion) 
        }
        else{
            navigation.navigate('Feedback', {'answers': selected})
            //go back to home page when quiz is over
        }

    }

    const prevQuestion = () => {
        if (currentQuestion > 0 ){
            const lastQuestion = currentQuestion-1
            setCurrentQuestion(lastQuestion)
            console.log("current question is: ", currentQuestion)
        }
    }
   
    return(
        <View>
            <Text style={{fontSize:20}}> {JSON.stringify(selected_subtopics)} </Text>
            <Text>questions screen</Text>

            <Question question={dummyQuestionList[currentQuestion].question} options={dummyQuestionList[currentQuestion].options} selected={selected} currentQuestion={currentQuestion} onSelect={onSelect}/>
            <Text>score: {score}</Text>
            <View style={{flexDirection:"row"}}>
                <Button title="next question" onPress={()=>handleAnswer(selected)}/>
                <Button title="previous question" onPress={()=>prevQuestion()} />
            </View>
            <Button title="go back" onPress={()=> navigation.goBack()}/>

        </View>
    )        
}

export default Questions


//[[{"answer": 1, "options": [Array], "question": "多位數 - ans: 1"}], [{"answer": 2, "options": [Array], "question": "分數的比較和加減 - ans: 2"}],
// [{"answer": 2, "options": [Array], "question": "分數除法及四則混合計算 - ans: 2"}]]