import { useState, FormEvent, useContext } from 'react';
import Head from "next/head";
import Image from "next/image";

import Link from "next/link";

// MY IMPORTS
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/Logo WaiterFull.png';

import { Input } from "../../components/Ui/Input";
import { Button } from '../../components/Ui/Button';

import { AuthContext } from '../../contexts/AuthContext';

export default function Signup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const { signUp } = useContext(AuthContext);

    async function handleSignUp(event: FormEvent){
      event.preventDefault();

      if(name === '' || email === '' || password === ''){
        setMensagem('PREENCHA TODOS OS CAMPOS!');
        return
      }

      setLoading(true);

      let data = {
        name,
        email,
        password
      }

      await signUp(data);

      setLoading(false);
    }

    return(
        <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Digital Waiter" />
        
        <div className={styles.login}>
            
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input placeholder="Digite seu nome" type="text" value={name} onChange={(e) => setName(e.target.value)}/>

            <Input placeholder="Digite seu email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <Input placeholder="Digite sua Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <Button type="submit" loading={loading}>Cadastrar</Button>
          </form>

          {mensagem && <span>{mensagem}</span>}

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>

        </div>
      </div>
    </>
    )
}