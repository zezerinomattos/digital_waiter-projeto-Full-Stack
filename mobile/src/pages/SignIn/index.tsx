import React, {useState} from "react";
import { 
    View, 
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

// MY IMPORTS
import styles from "./styles";

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [mensagem, setMensagem] = useState('');

    function hendleLogin(){

        if(email === '' || password === ''){
            setMensagem('Ops, preencha os campos!');
            return;
        }

        alert(`Email ${email} senha ${password}`);
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