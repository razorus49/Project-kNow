import { Text, StyleSheet, Button, View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData,storeData} from '../data/storage.js'


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

    storeData(topicScoreArr)
    const accuracy = score/length
    const [data, setData] = useState(null)


    const refresh = async() => {
        const y = await getData()
        setData(y)
    }

    //initialize state
    useEffect(() => {
        const fetchData = async () => {
            const storedData = await getData();
            setData(storedData);
        };

        fetchData();
    }, []);
    //empty dependency array means it only runs once on mount



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
            <Text> {JSON.stringify(data)}</Text>
            <Button title="refresh" onPress={()=>refresh()}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    dataContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    textContainer: {
        width: 170, // Fixed width for the text container
    },
    dataTextContainer: {
        flex: 1,
    },
    key: {
        fontWeight: 'bold',
    },
    value: {
        marginLeft: 5,
    },
    item:{ 
        margin:20
    }
});
export default Feedback