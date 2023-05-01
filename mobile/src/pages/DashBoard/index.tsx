import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

// Usamos esse Huck para navegação
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParmList } from '../../routes/app.routes';

// MY IMPORTS
import styles from './style';
import { AuthContext } from '../../contexts/AuthContext';

export default function DashBoard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParmList>>();

    const { signOut } = useContext(AuthContext);
    const [mensagem, setMensagem] = useState('');

    const [number, setNumber] = useState('');

    async function openOrder(){
        if(number === ''){
            setMensagem('Você precisa informar o numero da mesa!')
            return
        }

        //FAZER A REQUISICAO PARA ABRIR A MESA E NAVEGAR PARA PROXIMA TELA
        navigation.navigate('Order', { number: number, order_id: 'c5e7ab62-b461-45d1-b9c8-d317817f7bea' });
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput style={styles.input} keyboardType='numeric'
                placeholder='Numero da Mesa' placeholderTextColor='#F0F0F0'
                value={number} onChangeText={setNumber}
            />

            {
                mensagem && <Text style={styles.alertaText}>{mensagem}</Text>
            }

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}