import React , {useState} from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Button
  } from 'react-native';

//dictionary of topic titles and description
const data=[
    {title: "Arithmetics", desc:"brief desc"},
    {title: "Geometry", desc:"brief desc"},
    {title: "Statistics", desc:"brief desc"},
    {title: "Algebra", desc:"brief desc"}
]

//defining a single touchable opacity which acts like a button, used instead for better UI
const Item = ({item, onPress, backgroundColor, textColor, navigation, name}) => (
    <TouchableOpacity onPress={()=>
        {navigation.navigate('TopicSelection', {'topic': item.title}) //1st param: navigation screen, 2nd param: topic of the pressed component
        }} 
        style={[styles.item, {backgroundColor}]}
        key={item.key}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
      <Text style={[styles.desc, {color:textColor}]}> {item.desc}</Text>
    </TouchableOpacity>
  );



const Home = ({navigation}) => {
    const [selectedId, setSelectedId] = useState(); //defining properties 

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#08878F' : '#6e3b6e'; 
        const color = item.id === selectedId ? 'white' : 'black';
        const title = item.id === selectedId? item.title : 'Home'; //title of the selected item

        return (
            //passes parameters to the item component
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