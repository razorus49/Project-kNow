import React , {useState} from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    View,
    Image
  } from 'react-native';

//dictionary of topic titles and description
const data=[
    {title: "Arithmetics", desc:"brief desc     ", img: require("./images/homeScreen/arithmetics.png")},
    {title: "Geometry", desc:"brief desc     ", img:require("./images/homeScreen/geometry.png")},
    {title: "Statistics", desc:"brief desc     ", img:require("./images/homeScreen/statistics.png")},
    {title: "Algebra", desc:"brief desc     ", img:require("./images/homeScreen/algebra.png")}
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
      <Image source={item.img} // Update to use the image URI
      style={{ width: 100, height: 100 }} />

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
        <View style={styles.container}>

            <View style={styles.screenTitleContainer}>
                <Text style={styles.screenTitle}>Topic Selection</Text>
            </View>

            <View style={{flex:1, height:'100%'}}>
                <FlatList
                    style={{margin:5, flex:1}}
                    contentContainerStyle={{flexGrow:1}}
                    numColumns={4}
                    columnWrapperStyle={{justifyContent:'space-around'}}

                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        margin:0,
        height:20,
        backgroundColor:'#0D2B40',
        justifyContent:'center',

    },
    screenTitleContainer:{
        padding: 2,
        margin: 10,
        borderRadius:5,
        borderWidth:.5
    },
    item: {
        padding: 20,
        margin:20,
        flex:5,
        height:500
    },
    screenTitle:{
        fontSize: 40,
        color: '#0D2B40',
        textAlign:'center',
        margin:20,
        marginVertical:50,
        backgroundColor:'#BDE3FF',
        borderRadius:10,
        overflow: 'hidden'
    },
    title: {
        fontSize: 35,
    },
    desc:{
        fontSize: 20
    },
    row:{
        flex:1,
        justifyContent: "center"
    }

});

export default Home