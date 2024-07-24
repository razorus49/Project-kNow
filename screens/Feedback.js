import { Text, StyleSheet, Button, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const Feedback = ({route, navigation}) => {
    const userAnswers= route.params.userAnswers
    const correctAnswers = route.params.correctAnswers
    console.log(userAnswers, correctAnswers)
    const length = route.params.length
    let score=0
    for(let i=0;i<userAnswers.length;++i){
        if((userAnswers[i]+1)==correctAnswers[i]) {score++}
    }

    const accuracy = score/length
    return(
        <View>
            <Text style={{fontSize:30}}>Feedback Page</Text>
            <Text style={{fontSize:20}}>score: {JSON.stringify(score)}/{length} accuracy: {Math.round((score/length)*100)}% </Text> 
        </View>
    )
}

export default Feedback