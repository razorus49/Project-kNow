import { Text, SafeAreaView, StyleSheet, View} from 'react-native';
import CheckBox from 'expo-checkbox';
import React, {useEffect, useState, createContext} from 'react';

const topics = {'Arithmetics': ["多位數", "分數的比較和加減", "分數除法及四則混合計算", "小數乘法", "小數除法及四則混合計算","小數和分數互化", "分數乘法"],
    "Geometry": [ '三角形', '四邊形的面積', '立體圖形', '體積', '多邊形的麵積', '符合棒形圖', '圓', '立體的截面', '圓面積', '角和度', '容量和體積', '圓形圖',"軸對稱", '折線圖', '圓周' ],
    "Statistics":['平均數', '百分數', '時間和速率', '統計圖的應用'],
    "Algebra": ["運用英文字母表示數", "運用代數式表達以文字敍述和涉及未知量的運算和數量關係", "解簡易方程", "解涉及非整數係數或常數的簡易方程", "簡化代數表達式","運用方程解應用題"]
}

let d={}

//iterate throught the dictionary topics
for (const [key,value] of Object.entries(topics)){
    //create intermediate array 
    let m=[]
    for(let i=0;i<value.length;++i){
        m.push({id:i, subtopic_text:value[i], selected:false})
    }
    d[key]=m
}


//individual part of the checklist with checkbox and subtopic name
const SubtopicItem = ({subtopic, selected, id, onCheckboxPress, key}) =>{
    return(
        <View>
            <CheckBox
                value={selected}
                onValueChange={()=> onCheckboxPress(id)} />
            <Text style={{ fontSize:20, textDecorationLine: selected ? 'underline' : 'none', backgroundColor: selected? '#adff2f' : '#ffffff'  }}>
                {subtopic}
            </Text>
        </View>

    )
}

const Checklist= ({topic, valueGetter}) => {

    const [subtopics, setTopics] = useState(d[topic])

    //useEffect hook invokes the getter function every time the value of subtopics changes
    useEffect(()=>{valueGetter(subtopics)}, [subtopics, valueGetter])

    const toggleTopic = (id)=>{
      //subtopic would be dictionaries in the array, if the id is selected, copy the previous content and change the state of selection to the opposite boolean

        const updatedSubtopics = subtopics.map((subtopic) =>
          subtopic.id === id ? { ...subtopic, selected: !subtopic.selected } : subtopic
        );

        //use the setTopics function to update the state (so it updates in real time)
        setTopics(updatedSubtopics)
    }
    

    const onCheckboxPress = async(id) => {
        toggleTopic(id)
    }
    
    return(

        <View>
            {subtopics.map((subtopic, index) => (
                <SubtopicItem
                    subtopic = {subtopic.subtopic_text}
                    selected={subtopic.selected}
                    id={subtopic.id}
                    toggleTopic={toggleTopic}
                    valueGetter= {valueGetter}
                    onCheckboxPress={onCheckboxPress}
                    key={index}
                />
            ))}
        </View>
    )
}


export default Checklist