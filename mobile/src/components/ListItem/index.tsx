import React from 'react';
import { View, Text } from 'react-native';
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
            <Text>Item da lista</Text>
        </View>
    );
}