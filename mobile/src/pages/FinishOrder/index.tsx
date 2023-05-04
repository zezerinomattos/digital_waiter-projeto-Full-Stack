import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

// MY IMPORTS
import styles from './styles';

import { api } from '../../service/api';

// IMPORTS OF NAVIGATION
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParmList } from '../../routes/app.routes';

type RouteDetailParams = {
    FinishOrder: {
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder(){
    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParmList>>();

    //FUNÇÃO QUE VAI FINALIZAR O PEDIDO
    async function handleFinish(){
        await api.put('/order/send', {
            order_id: route.params?.order_id
        })
        .then(() =>{
            navigation.popToTop();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather name='shopping-cart' size={20} color={'#0D0D0D'} />
            </TouchableOpacity>
        </View>
    )
}