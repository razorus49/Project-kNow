import React , {useState} from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    Button,
    TouchableOpacity
  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountDashboard from './AccountDashboard';

const Stack = createNativeStackNavigator()

const data=[
    {title: "Arithmetics", desc:"brief desc"},
    {title: "Geometry", desc:"brief desc"},
    {title: "Statistics", desc:"brief desc"},
    {title: "Algebra", desc:"brief desc"}
]

const Item = ({item, onPress, backgroundColor, textColor, navigation, name}) => (
    
    <TouchableOpacity onPress={()=>
        {navigation.navigate('TopicSelection', {'topic': item.title})
        console.log(item.title, 'is pressed')}} 
        style={[styles.item, {backgroundColor}]}
        key={item.key}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
      <Text style={[styles.desc, {color:textColor}]}> {item.desc}</Text>

    </TouchableOpacity>
  );



const Home = ({navigation}) => {
    const [selectedId, setSelectedId] = useState();

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#08878F' : '#6e3b6e';
        const color = item.id === selectedId ? 'white' : 'black';
        const title = item.id === selectedId? item.title : 'Home';
        console.log(title)
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
                navigation={navigation}

            />
            );
        };

    return (
        <SafeAreaView style={styles.container}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            horizontal={true}
        />


        </SafeAreaView>
        

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 35,
    },
    desc:{
        fontSize: 20
    }
});

export default Home