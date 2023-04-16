import Head from "next/head";
import Image from "next/image";

import Link from "next/link";

// MY IMPORTS
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/Logo WaiterFull.png';

import { Input } from "../../components/Ui/Input";
import { Button } from '../../components/Ui/Button';

export default function Signup(){
    return(
        <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Digital Waiter" />
        
        <div className={styles.login}>
            
          <h1>Criando sua conta</h1>

          <form >
            <Input placeholder="Digite seu nome" type="text"/>

            <Input placeholder="Digite seu email" type="text"/>

            <Input placeholder="Digite sua Senha" type="password"/>

            <Button type="submit" loading={false}>Cadastrar</Button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>

        </div>
      </div>
    </>
    )
}