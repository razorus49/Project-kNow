import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
import { useNavigation, useRoute, getParam } from '@react-navigation/native';
import Question from './components/Question.js'

//dummy questions for testing


const Questions = ({route, navigation}) =>{
    const QuestionList = route.params.questionList
    const correctAnswers = route.params.correctAnswers
    const numOfQuestions = route.params.number
    const subtopicList = route.params.subtopicList

    

    // console.log(QuestionList)
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

        const isCorrect = (answer[currentQuestion]+1) === QuestionList[currentQuestion].answer
        console.log('answers:', answer, QuestionList[currentQuestion].answer )

        const nextQuestion = currentQuestion + 1

        if(nextQuestion < QuestionList.length){
            setCurrentQuestion(nextQuestion) 
        }
        else{
            navigation.navigate('Feedback', {'userAnswers': selected, 'correctAnswers':correctAnswers, 'length':numOfQuestions, 'subtopicList':subtopicList})
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
    
    // console.log(QuestionList)
    return(
        <View>

             <Text>questions screen ; number of questions: {numOfQuestions}</Text>
             <Text>{JSON.stringify(selected)}</Text>
            
            <Question   question={QuestionList[currentQuestion].question} 
                        options={QuestionList[currentQuestion].options} 
                        selected={selected[currentQuestion]} 
                        image={QuestionList[currentQuestion].image}
                        onSelect={onSelect}/> 
 
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