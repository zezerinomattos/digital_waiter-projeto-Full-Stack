import {  } from 'react';
import Head from 'next/head';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../components/Header';

import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Product(){
    return(
        <>
            <Head>
            <title>Novo Produto</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Novo Produto</h1>
                    <form className={styles.form}>
                        <select >
                            <option>Selecione a categoria</option>
                            <option>Bebidas</option>
                            <option>Pizzas</option>
                        </select>

                        <input type="text" placeholder='Nome do produto'
                            className={styles.input}
                        />

                        <input type="text" placeholder='Valor do produto' 
                            className={styles.input}
                        />

                        <textarea placeholder='Descreva seu produto...'
                            className={styles.input}
                        />

                        <button className={styles.buttonAdd} type='submit'>Cadastrar</button>
                    </form>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
        props: {}
    }
});