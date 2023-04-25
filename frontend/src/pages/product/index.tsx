import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

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

    const [name, setName] = useState('');
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('');

    const [mensagem, setMensagem] = useState('');

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
        // console.log(categorySelected);
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        try {
            const data = new FormData();

            //VERIFICACAO DE CAMPOS
            if(name === '' || price === '' || description === '' || imageAvatar === null){
                setMensagem('Preencha todos os campos!');
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const api = setupAPIClient();

            await api.post('/product', data);

            toast.success('Produto cadastrado com sucesso!');
            
        } catch (err) {
            console.log(err);
            toast.error('Ops erro ao cadastrar');
        }

        setName('');
        setPrice('')
        setDescription('');
        setAvatarUrl('');
        setImageAvatar(null);
        setCategorySelected(0);        
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
                    <form className={styles.form} onSubmit={handleRegister}>

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
                            className={styles.input} value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input type="text" placeholder='Valor do produto' 
                            className={styles.input} value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <textarea placeholder='Descreva seu produto...'
                            className={styles.input} value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button className={styles.buttonAdd} type='submit'>Cadastrar</button>
                    </form>

                    {mensagem && <span>{mensagem}</span>}

                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/category');

    return{
        props: {
            categoryList: response.data
        }
    }
});