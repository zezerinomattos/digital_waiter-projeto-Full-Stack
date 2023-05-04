import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

// MY IMPORTS
import styeles from './styles';

interface ItemProps {
   data:{
        id: string;
        product_id: string;
        name: string;
        amount: string;
   };
   deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ItemProps){

    function handleDeleteItens(){
        deleteItem(data.id);
    }

    return(
        <View style={styeles.container}>
            <Text style={styeles.item}>
                {data.amount} - {data.name}
            </Text>

            <TouchableOpacity onPress={handleDeleteItens}>
                <Feather name='trash-2' color={'#FF3F4B'} size={25}/>
            </TouchableOpacity>
        </View>
    );
}