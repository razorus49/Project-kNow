import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (results) => {
  try {
    // Retrieve existing results
    const existingResults = await AsyncStorage.getItem('quizResults');
    let updatedResults = [];
    
    if (existingResults) {
        updatedResults = JSON.parse(existingResults);
    }

    // Add new results
    updatedResults.push(results);
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

export {getData , storeData} 