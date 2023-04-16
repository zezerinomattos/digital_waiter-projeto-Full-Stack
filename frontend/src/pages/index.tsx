import Head from "next/head";
import Image from "next/image";

import Link from "next/link";

// MY IMPORTS
import styles from '../../styles/home.module.scss';
import logoImg from '../../public/Logo WaiterFull.png';

import { Input } from "../components/Ui/Input";
import { Button } from '../components/Ui/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzria - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Digital Waiter" />
        
        <div className={styles.login}>
          <form >
            <Input placeholder="Digite seu email" type="text"/>

            <Input placeholder="Digite sua Senha" type="password"/>

            <Button type="submit" loading={false}>Acessar</Button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>

        </div>
      </div>
    </>
  )
}
