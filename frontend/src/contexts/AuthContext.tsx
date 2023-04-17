import { createContext, ReactNode, useState } from 'react';
//destroyCookie é para tentarmos destruir o cookie
import { destroyCookie } from 'nookies';
import Router from 'next/router';

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
        //alert("Clicou")
        console.log("Dados para logar", email)
        console.log("Dados para logar", password)
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}