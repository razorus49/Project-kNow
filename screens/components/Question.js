import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState, createContext} from 'react';
import OptionList from './OptionList';


//style={{color: selected? '#44B0F2' : '#b191ef' }}
const Options = ({text, id, selected, onSelect}) => (
    <View >
      <TouchableOpacity style={styles.item} onPress={()=> onSelect(id)}>
        <Text style={{color: selected? '#44B0F2' : '#b191ef' }}> {text} selected: {JSON.stringify(selected)} id:{id}</Text>
      </TouchableOpacity>
    </View>
  )

  //example of options  [{"id": 0, "text": "<script>"}, {"id": 1, "text": "<javascript>"}, {"id": 2, "text": "<js>"}, {"id": 3, "text": "<scripting>"}]

const Question = ({question, options, selected, onSelect, image}) => {
    
    //put options into a dictionary that can be better utilised with id
    let optionsDic = []
    for (let i=0;i<options.length;++i){
        optionsDic.push({text:options[i], id: (i)})
    }
  
    //state needs to be in the parent component which would otherwise trigger 
    // Cannot update a component while rendering a different component warning

    const img = image
    return (
        <View>
            <Text> question component</Text>
            <Text>{JSON.stringify(question)}</Text>
            <Text>{JSON.stringify(image)}</Text>
            <Image source={require("../images/question1.png")}/>
            
                 <FlatList 
                    data={optionsDic}
                    renderItem={({item}) => 
                        (<Options 
                        text={item.text}
                        id={item.id}
                        selected={item.id===selected}
                        onSelect={onSelect}
                        />)}
                    keyExtractor={(item) => item.id.toString()}
                /> 

        </View>
    )
}

const styles = StyleSheet.create({

    item: {
      backgroundColor: '#f9c2ff',
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 1,
    },
    title: {
      fontSize: 32,
    },
  });

export default Question