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
   }
}

export function ListItem({ data }: ItemProps){
    return(
        <View style={styeles.container}>
            <Text style={styeles.item}>
                {data.amount} - {data.name}
            </Text>

            <TouchableOpacity>
                <Feather name='trash-2' color={'#FF3F4B'} size={25}/>
            </TouchableOpacity>
        </View>
    );
}