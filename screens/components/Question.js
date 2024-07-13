import { Text, StyleSheet, Button, View} from 'react-native';
import React, {useEffect, useState, createContext} from 'react';

const Question = ({question, options, handleAnswer}) => {

    //react child component cannot receive object so properties are passed independently (for question and options)
    //somehow the parameters become objects? 
    return (
        <View>


            <Text> question component</Text>
            <Text>{JSON.stringify(question)}</Text>
            {options.map((option, index)=> (
                <Button key={index} title={option} onPress={()=> handleAnswer(index+1) }/>
            ))}
        </View>
    )
}

export default Question