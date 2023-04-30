import React, {useState, useContext} from "react";
import { 
    View, 
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

// MY IMPORTS
import styles from "./styles";

import{ AuthContext } from '../../contexts/AuthContext';

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [mensagem, setMensagem] = useState('');

    const { signIn }  = useContext(AuthContext);

    async function hendleLogin(){

        if(email === '' || password === ''){
            setMensagem('Ops, preencha os campos!');
            return;
        }
        
        await signIn({email, password});
    }

    return(
       <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} resizeMode="contain" />

            <View style={styles.inputContainer}>
                  <TextInput placeholder="Digite seu email" 
                    placeholderTextColor='#121126' style={styles.input}
                    value={email} onChangeText={setEmail}
                  />  

                  <TextInput secureTextEntry={true} 
                    placeholder="Digite sua senha" placeholderTextColor='#121126' 
                    style={styles.input}
                    value={password} onChangeText={setPassword}
                  /> 
                  
                  {mensagem && <Text style={styles.alertaText}>{mensagem}</Text>
}
                  <TouchableOpacity style={styles.button} onPress={hendleLogin}>
                    <Text style={styles.buttonText}>Acessar</Text>
                  </TouchableOpacity>
            </View>
       </View>
    );
}