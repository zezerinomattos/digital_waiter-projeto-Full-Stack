import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

// MY IMPORTS
import { AuthContext } from '../../contexts/AuthContext';

export default function DashBoard(){
    const { signOut } = useContext(AuthContext);

    return(
        <View>
            <Text>Tela Dashboard</Text>
            <Button title='Sair do APP' onPress={signOut}/>
        </View>
    )
}