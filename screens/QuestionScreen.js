import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
import { useNavigation, useRoute, getParam } from '@react-navigation/native';
import {MultipleChoiceQuestion, TextInputQuestion} from '../components/Question.js'

//dummy questions for testing


const Questions = ({route, navigation}) =>{
    const QuestionList = route.params.questionList
    const correctAnswers = route.params.correctAnswers
    const numOfQuestions = route.params.number
    const subtopicList = route.params.subtopicList
    const questionTypeList = route.params.questionTypeList
    

    // console.log(QuestionList)
    const initializeArrayWithValues = (n, val = null) => Array(n).fill(val)
    let dummy_arr = initializeArrayWithValues(numOfQuestions, '')

    //can update questions in real time by changing state
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answer, setAnswer] = useState(dummy_arr)



    //id refers to option 1,2,3 or 4 with index 0,1,2,3
    //must be temp_arr[currentQuestion], not append, as it might change answer of previous questions
    const onMcAns = (id) => {
        let temp_arr = [...answer]
        temp_arr[currentQuestion] = id
        setAnswer(temp_arr)
        console.log(temp_arr)
    }

    const onTextAns = (ans) =>{
        let temp_arr = [...answer]

        temp_arr[currentQuestion] = ans

        setAnswer(temp_arr)
    }

    const handleAnswer = (answer) => {

        // const isCorrect = (answer[currentQuestion]) === QuestionList[currentQuestion].answer
        console.log('answers:', answer, QuestionList[currentQuestion].answer )

        const nextQuestion = currentQuestion + 1

        if(nextQuestion < QuestionList.length){
            setCurrentQuestion(nextQuestion) 
        }
        else{
            navigation.navigate('Feedback', {userAnswers: answer, correctAnswers:correctAnswers, length:numOfQuestions, subtopicList:subtopicList, questionTypeList:questionTypeList })
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
             <Text>{JSON.stringify(answer)}</Text>
            
            {QuestionList[currentQuestion].type === "multipleChoice" && 
            <MultipleChoiceQuestion   
                question={QuestionList[currentQuestion].question} 
                options={QuestionList[currentQuestion].options} 
                selected={answer[currentQuestion]} 
                image={QuestionList[currentQuestion].image}
                onSelect={onMcAns}/> }

            {QuestionList[currentQuestion].type ==="textInput" && 
            <TextInputQuestion 
                question={QuestionList[currentQuestion].question}
                image={QuestionList[currentQuestion].image}
                ans = {answer[currentQuestion]}
                onAns={onTextAns} />
            }
 
            <View style={{flexDirection:"row"}}>
                <Button title="next question" onPress={()=>handleAnswer(answer)}/>
                <Button title="previous question" onPress={()=>prevQuestion()} />
            </View>  
            <Button title="go back" onPress={()=> navigation.goBack()}/> 

        </View>
    )        
}

export default Questions


//[[{"answer": 1, "options": [Array], "question": "多位數 - ans: 1"}], [{"answer": 2, "options": [Array], "question": "分數的比較和加減 - ans: 2"}],
// [{"answer": 2, "options": [Array], "question": "分數除法及四則混合計算 - ans: 2"}]]