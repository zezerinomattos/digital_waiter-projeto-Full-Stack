import { useContext, FormEvent, useState } from 'react';
import Head from "next/head";
import Image from "next/image";

import Link from "next/link";

// MY IMPORTS
import styles from '../../styles/home.module.scss';
import logoImg from '../../public/Logo WaiterFull.png';

import { Input } from "../components/Ui/Input";
import { Button } from '../components/Ui/Button';

import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      setMensagem('PREENCHA OS DADOS');
      return
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Pizzria - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Digital Waiter" />
        
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu email" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>

            <Input placeholder="Digite sua Senha" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

            <Button type="submit" loading={loading}>Acessar</Button>
          </form>

          {mensagem && <span>{mensagem}</span>}

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>

        </div>
      </div>
    </>
  )
}
