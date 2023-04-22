import { useState, FormEvent } from 'react';
import Head from "next/head";
import { toast } from 'react-toastify';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../components/Header';

import { api } from '../../services/apiClient';

import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Category(){
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if(name === ''){
            return;
        }

        await api.post('/category', {
            name: name
        })
        .then(() => {
            toast.success('CATEGORIA CADASTRADA COM SUCESSO!');
            setName('');
        })
        .catch((err) => {
            console.log(err);
        });

    }

    return(
        <>
            <Head>
                <title>Nova Categoria - Digital Witer</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Cadastrar categorias</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input type="text" 
                        placeholder="Digite o nome da categoria" 
                        className={styles.input} 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />

                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
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