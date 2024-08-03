import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (results) => {
  try {
    // Retrieve existing results
    const existingResults = await AsyncStorage.getItem('quizResults');
    let updatedResults = {"多位數":0, "分數的比較和加減":0, "分數除法及四則混合計算":0, "小數乘法":0, "小數除法及四則混合計算":0,"小數和分數互化":0, "分數乘法":0,
    '三角形':0, '四邊形的面積':0, '立體圖形':0, '體積':0, '多邊形的麵積':0, '符合棒形圖':0, '圓':0, '立體的截面':0, '圓面積':0, '角和度':0, '容量和體積':0, '圓形圖':0,"軸對稱":0, '折線圖':0, '圓周' :0,
    '平均數':0, '百分數':0, '時間和速率':0, '統計圖的應用':0,
    "運用英文字母表示數":0, "運用代數式表達以文字敍述和涉及未知量的運算和數量關係":0, "解簡易方程":0, "解涉及非整數係數或常數的簡易方程":0, "簡化代數表達式":0,"運用方程解應用題":0
};
    
    if (existingResults) {
        updatedResults = JSON.parse(existingResults);
    }

    // Add new results
    for (let i=0; i<results.length;++i){
      updatedResults[results[i].subtopic] = updatedResults[results[i].subtopic] + 10*results[i].correct 
      if(updatedResults[results[i].subtopic]- 12*(results[i].total - results[i].correct) >=0){
        updatedResults[results[i].subtopic] = updatedResults[results[i].subtopic] - 12*(results[i].total - results[i].correct)
      }else{
        updatedResults[results[i].subtopic] =0
      }
      //add 10 points for each correct question, minus 12 for each incorrect
      //baseline points is 0
    }

    console.log('stored: ',updatedResults)
    // Save updated results
    await AsyncStorage.setItem('quizResults', JSON.stringify(updatedResults)).then(() => {
      console.log('Data saved successfully')
  })

  } catch (error) {
      console.error('Error saving quiz results:', error);
  }
};

const getData = async () => {
  try {
    const results = await AsyncStorage.getItem('quizResults');
    if(results){
      console.log('retrieved: ', results)
      return JSON.parse(results)
    }
    else {return []}
} catch (error) {
    console.error('Error retrieving quiz results:', error);
    return [];
}
};

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('quizResults')
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}

export {getData , storeData, removeValue} 