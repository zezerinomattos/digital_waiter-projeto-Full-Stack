import { createContext, ReactNode, useState } from 'react';
//destroyCookie é para tentarmos destruir o cookie
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';

type AuthContextData={
    user: UserProps;
    isAuthenticated: boolean;
    
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

//Funão para deslogar
export function signOut(){
    try {
        destroyCookie(undefined, '@digitalwaiter')
        Router.push('/')
    } catch{
        console.log('erro ao deslogar!');
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps); //Vai obedecer a tipagem
    const isAuthenticated = !!user; // pra converter em um boolean se não tiver nada em user
    //ele converte para false se tiver alguma coisa ele fica true para controlar se está logado

    async function signIn({ email, password}: SignInProps){
        try {
            const response = await api.post('/session', {
                email,
                password
            })
            //console.log(response.data);
            const { id, name, token } = response.data;

            setCookie(undefined, '@digitalwaiter', token, {
                maxAge: 60 * 60 * 24 * 30, //O token expira em 1 mes
                path: "/" //Qualquer caminho era acesso a os cookies
            })

            setUser({
                id,
                name,
                email,
            })

            //PASSAR PARA PROXIMAS REQUISIÇÕES O NOSSO TOKEN
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //REDIRECIONAR O USER PARA A PAGINA DE DASHBOARD (ULTIMOS PEDIDOS)
            Router.push('/dashboard')
            

        } catch (err) {
            console.log('ERRO AO ACESSAR', err);
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}