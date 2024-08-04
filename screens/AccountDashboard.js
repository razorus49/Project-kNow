import React,{useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView
  } from 'react-native';

import {getData, removeValue} from '../data/storage.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const item = ({text}) => (
    <View>
        <Text>{text}</Text>
    </View>
)

//simple screen for testing purposes
const AccountDashboard = ({navigation}) => {

    
    const [data, setData] = useState(null)


    const refresh = async() => {
        const y = await getData()
        setData(y)
    }

    //initialize state
    useEffect(() => {
        const fetchData = async () => {
            const storedData = await getData();
            setData(storedData);
        };

        fetchData();
    }, []);
    //empty dependency array means it only runs once on mount

    return(
        <View style={styles.container}> 
            <Text style={{fontSize:30}}> Account Dashboard </Text>
            <Text>{JSON.stringify(data)}</Text>
            <Text>Arithmetics</Text>
            <ScrollView style={styles.dataContainer}>
                    {Object.keys(data).map((key) => (
                        <View style={styles.row} key={key}>
                            <View style={styles.textContainer}>
                                <Text style={styles.key}>{key}: </Text>
                            </View>
                            <View style={styles.dataTextContainer}>
                                <Text style={styles.value}>{data[key]}</Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
            <Button title="refresh" onPress={()=>refresh()}/>
            <Button title="links to home"
            onPress={()=> navigation.navigate('Home')}/>
            <Button title="reset" onPress={()=>removeValue()}/>
        </View>
    
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    dataContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    textContainer: {
        width: 170, // Fixed width for the text container
    },
    dataTextContainer: {
        flex: 1,
    },
    key: {
        fontWeight: 'bold',
    },
    value: {
        marginLeft: 5,
    },
});
export default AccountDashboard
