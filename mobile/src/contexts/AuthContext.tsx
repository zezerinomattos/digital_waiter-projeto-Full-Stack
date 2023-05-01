import React, {useState, createContext, ReactNode, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// MY IMPORTS
import { api } from '../service/api';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
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
    const [loadingAuth, setLoadingAuth] = useState(true);

    //ESTOU VERIFICANDO SE ELE FEZ O LOGIN VAI VIRAR TRUE
    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser(){

            //PEGAR OS DADOS SALVOS DO NOSSO USER
            const userInfo = await AsyncStorage.getItem('@digitalwaiter');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            //VERIFICANDO SE RECEBEMOS AS INFORMAÇÕES DELE
            if(Object.keys(hasUser).length > 0){
                // PASSANDO O TOKEN PARA AS ROTAS USAREM O Authorization NAS CHAMADAS DA API
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }
            setLoadingAuth(false);
        }

        getUser();

    }, []);

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

    async function signOut(){
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: ''
                });
            })
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, loading, loadingAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}