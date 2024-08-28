import { Text, TouchableOpacity, StyleSheet, View, FlatList} from 'react-native';
import {useState, useEffect} from 'react'


const Options = ({text, id, selected, onSelect}) => (
    <View >
      <TouchableOpacity onPress={onSelect(id)}>
        <Text style={{color: selected? '#44B0F2' : '#000000' }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
  

const OptionList = ({options, selected, onSelect}) => (
    <View>
            <FlatList 
                data={options}
                renderItem={({item}) => <Options 
                title={item.text}
                id={item.id}
                selected={item.id===selected}
                onSelect={onSelect}
                />}
                keyExtractor={item => item.id}
            />

    </View>
)
export default OptionList