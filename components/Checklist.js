import { Text, SafeAreaView, StyleSheet, View} from 'react-native';
import CheckBox from 'expo-checkbox';
import React, {useState} from 'react';

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
        m.push({'id':i, 'subtopic_text':value[i], 'selected':false})
    }
    d[key]=m
}



const SubtopicItem = ({subtopic, selected, id, toggleTopic}) =>{

    return(
        <View>
            <CheckBox
                value={selected}
                onValueChange={()=> toggleTopic(id)} />
            <Text style={{ fontSize:20, textDecorationLine: selected ? 'underline' : 'none', backgroundColor: selected? '#adff2f' : 'none'  }}>
                {subtopic}
            </Text>
        </View>

    )
}


const Checklist= ({topic}) => {

    const [subtopics, setTopics] = useState(d[topic])

    const toggleTopic = (id)=>{
      //subtopic would be dictionaries in the array, if the id is selected, copy the previous content and change the state of selection to the opposite boolean

        const updatedSubtopics = subtopics.map((subtopic) =>
          subtopic.id === id ? { ...subtopic, selected: !subtopic.selected } : subtopic
        );
        setTopics(updatedSubtopics);
        
  };
    

    return(
        <View>
            {subtopics.map(subtopic => (
                <SubtopicItem
                    subtopic = {subtopic.subtopic_text}
                    selected={subtopic.selected}
                    id={subtopic.id}
                    toggleTopic={toggleTopic}
                />
            ))}
        </View>
    )
}

export default Checklist