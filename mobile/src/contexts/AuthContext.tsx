import React, {useState, createContext, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// MY IMPORTS
import { api } from '../service/api';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}


type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData); 

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });

    const [loading, setLoading] = useState(false);

    //ESTOU VERIFICANDO SE ELE FEZ O LOGIN VAI VIRAR TRUE
    const isAuthenticated = !!user.name;

    async function signIn({email, password}: SignInProps){
        setLoading(true);

        // Forma 1 de fazer
        // try {
        //     const response = await api.post('/session', {
        //         email,
        //         password
        //     })
        //     console.log(response.data);

        // } catch (err) {
        //     console.log('Erro ao acessar', err);
        //     setLoading(false);
        // }

        // Forma dois de fazer
        await api.post('/session', {
            email,
            password
        })
        .then(async(response) => {
            //Desconstruir a resposta e passar para o user
            const { id, name, email, token } = response.data;

            const data = {
                ...response.data
            };

            await AsyncStorage.setItem('@digitalwaiter', JSON.stringify(data));

            // PASSANDO O TOKEN PARA AS ROTAS USAREM O Authorization NAS CHAMADAS DA API
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token,
            })
            setLoading(false);
        })
        .catch((err) => {
            console.log('Erro ao acessar', err);
            setLoading(false);
        });
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}