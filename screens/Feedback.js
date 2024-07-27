import { Text, StyleSheet, Button, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeResults = async (value) => {
    try {
        const JSONValue = JSON.stringify(value) 
        
        await AsyncStorage.setItem('test', JSONValue)
        console.log('stored', JSONValue)
    } catch (e){
        console.log('error occured')
    }
}



const Item = ({subtopic, correct, total}) => {
    //{name of subtopic, number of correct questions, total number of questions for that subtopic} are the parameters received
    return(
    <View>
        <Text style={{fontSize:20}}> {subtopic}: {correct}/{total}</Text>
    </View>)
}

const Feedback = ({route, navigation}) => {
    const userAnswers= route.params.userAnswers
    const correctAnswers = route.params.correctAnswers
    const subtopicList = route.params.subtopicList
    const length = route.params.length
    let score=0

    let topicScore = {}

    for(let i=0;i<subtopicList.length;++i){
        topicScore[subtopicList[i]] = {'subtopic':subtopicList[i], 'correct':0, 'total':0, 'id':i}
    }
    //results in an object with unique subtopics as key and initialized items


    for(let i=0;i<userAnswers.length;++i){
        if((userAnswers[i]+1)==correctAnswers[i]) {
            score++
            topicScore[subtopicList[i]]['correct']++
            }
        topicScore[subtopicList[i]]['total']++
    }
    //calculate score for each subtopic

    //move object into array so it can be passed into a flatlist
    let topicScoreArr = []
    for (const [key, value] of Object.entries(topicScore)){
        topicScoreArr.push(value)
    }
    console.log(topicScoreArr)

    storeResults(topicScoreArr)
    const accuracy = score/length
    return(
        <View>
            <Text style={{fontSize:30}}>Feedback Page</Text>
            <Text style={{fontSize:20}}>score: {JSON.stringify(score)}/{length} accuracy: {Math.round((score/length)*100)}% </Text> 

            <FlatList 
                data={topicScoreArr}
                renderItem={({item}) => <Item 
                    subtopic={item.subtopic}
                    correct={item.correct}
                    total={item.total}
                keyExtractor={(item)=>item.id.toString()}
                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        margin:20
    }
})
export default Feedback