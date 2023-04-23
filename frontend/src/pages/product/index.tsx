import { useState, useEffect, useContext, ChangeEvent } from 'react';
import Head from 'next/head';
import { FiUpload } from 'react-icons/fi';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../components/Header';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { setupAPIClient } from '../../services/api';

// VAMOS TIPAR O CATEGORYLIST
type ItemProps = {
    id: string,
    name: string
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps){

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] =useState<null | File>(null);

    const [categories, setCategory] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return
        }

        const image = e.target.files[0];
        if(!image){
            return
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>){
        setCategorySelected(parseInt(event.target.value))
        console.log(categorySelected);
    }

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

                        {/*CARREGANDO A IMG DO PRODUTO */}
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload  size={25} color='#FFF'/>
                            </span>
                            <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                            {
                                avatarUrl && 
                                    <img className={styles.preview} src={avatarUrl} 
                                        alt='Foto do Produto'
                                        width={250}
                                        height={250}
                                    />
                            }
                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {
                                categories.map((item, index) => {
                                    return(
                                        <option value={index} key={item.id}>{item.name}</option>
                                    )
                                })
                            }
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

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/category');
    console.log(response.data);

    // const [response, setResponse] = useState();

    return{
        props: {
            categoryList: response.data
        }
    }
});