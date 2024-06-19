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

const data=[
    {title: "Arithmetics", description:"brief desc"},
    {title: "Geometry", desc:"brief desc"},
    {title: "Statistics", desc:"brief desc"},
    {title: "Algebra", desc:"brief desc"}
]

const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
      <Text style={[styles.desc, {color:textColor}]}> {item.desc}</Text>
    </TouchableOpacity>
  );


const Home = ({navigation}) => {
    const [selectedId, setSelectedId] = useState();

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#89FCEE' : '#6e3b6e';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
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
        />
        <Button title="go to accounts"
        onPress = {()=> navigation.navigate('Account')}/>
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
        fontSize: 40,
    },
    desc:{
        fontSize: 20
    }
});

export default Home