import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

// MY IMPORTS
import styles from './style';
import { AuthContext } from '../../contexts/AuthContext';

export default function DashBoard(){
    const { signOut } = useContext(AuthContext);
    const [mensagem, setMensagem] = useState('');

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput style={styles.input} keyboardType='numeric'
                placeholder='Numero da Mesa' placeholderTextColor='#F0F0F0'
            />

            {
                mensagem && <Text style={styles.alertaText}>{mensagem}</Text>
            }

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}