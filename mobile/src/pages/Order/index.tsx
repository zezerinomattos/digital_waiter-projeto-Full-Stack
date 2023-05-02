import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

// MY IMPORTS
import styles from './style';

import { api } from '../../service/api';

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type CategoryProps = {
    id: string;
    name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>();

    const [amount, setAmount] = useState('1');

    useEffect(() => {

        loadingCategory();
        
    }, []);

    // FUNÇÃO DE DELETAR UMA ORDER ABERTA
    async function handleCloseOrder(){
        try {           
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })
            navigation.goBack();

        } catch (error) {
            console.log('ops: ' + error);
        }
    }

    // FUNÇÃO DE LISTAGEM DE CATEGORIA
    async function loadingCategory(){
        await api.get('/category').then(response =>{
            
            setCategory(response.data);
            setCategorySelected(response.data[0]);
        })
        .catch(err =>{
            console.log('Erro:' + err);
        });
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' size={25} color={'#FF3F4B'}/>
                </TouchableOpacity>
            </View>

           {
                category.length !== 0 && (
                    <TouchableOpacity style={styles.input}>
                        <Text style={{ color: '#FFF' }}>{categorySelected?.name}</Text>
                    </TouchableOpacity>
                )
           }

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF' }}>Pizza de Calabrasa</Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade:</Text>
                <TextInput style={[styles.input, {width: '60%', textAlign: 'center'}]}
                    placeholderTextColor={'#F0F0F0'} keyboardType='numeric'
                    value={amount} onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}