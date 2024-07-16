import { Text, StyleSheet, Button, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const Feedback = ({route, navigation}) => {
    const score= route.params.score
    const length = route.params.length
    console.log('length is', length)
    console.log('score is', score)

    return(
        <View>
            <Text style={{fontSize:30}}>Feedback Page</Text>
            <Text style={{fontSize:20}}>score: {JSON.stringify(score)}/{length} accuracy: {Math.round((score/length)*100)}%</Text> 
        </View>
    )
}

export default Feedback