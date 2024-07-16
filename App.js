import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home.js'
import AccountDashboard from './screens/AccountDashboard.js'
import TopicSelection  from './screens/TopicSelection.js'
import Questions  from './screens/QuestionScreen.js'
import Feedback from './screens/Feedback.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()


function StackNav(){
  return(
    
    //stack navigators allow screens to be pushed on top of each other (original screen is maintained by the program)

    <Stack.Navigator initialRouteName="QuestionsHome" screenOptions={{headerShown:false}}>
      <Stack.Screen name="QuestionsHome" component={HomeScreen} />
      <Stack.Screen name="TopicSelection" component={TopicSelection} />
      <Stack.Screen name="Questions" component={Questions} />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  );
}

export default function App({navigation}) {
  return (
    //creates navigation on the lower tab
    <NavigationContainer >
      <Tab.Navigator screenOptions={{headerShown:false}} independent={true}>
        <Tab.Screen name="Home" component={StackNav} />
        <Tab.Screen name="Account" component={AccountDashboard}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
