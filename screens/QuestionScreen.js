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

//dummy questions for testing

let dummyQuestions = JSON.parse(JSON.stringify(dummyQuestionsJSON)).dummyQuestionsJSON

const Questions = ({route, navigation}) =>{
    const dummyQuestionList = route.params.questionList
    const correctAnswers = route.params.correctAnswers
    const numOfQuestions = route.params.number


    

    // console.log(dummyQuestionList)
    const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val)
    let selected_arr = initializeArrayWithValues(numOfQuestions, '')

    //can update questions in real time by changing state
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selected, setSelected] = useState(selected_arr)



    //id refers to option 1,2,3 or 4
    const onSelect = (id) => {
        let temp_arr = [...selected]
        temp_arr[currentQuestion] = id
        setSelected(temp_arr)
        console.log(temp_arr)
    }

    const handleAnswer = (answer) => {

        const isCorrect = (answer[currentQuestion]+1) === dummyQuestionList[currentQuestion].answer
        console.log('answers:', answer, dummyQuestionList[currentQuestion].answer )

        const nextQuestion = currentQuestion + 1

        if(nextQuestion < dummyQuestionList.length){
            setCurrentQuestion(nextQuestion) 
        }
        else{
            navigation.navigate('Feedback', {'userAnswers': selected, 'correctAnswers':correctAnswers, 'length':numOfQuestions})
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
    
    // console.log(dummyQuestionList)
    return(
        <View>

             <Text>questions screen ; number of questions: {numOfQuestions}</Text>
             <Text>{JSON.stringify(selected)}</Text>
            
                
     
            <Question question={dummyQuestionList[currentQuestion].question} options={dummyQuestionList[currentQuestion].options} selected={selected[currentQuestion]} onSelect={onSelect}/> 
 
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