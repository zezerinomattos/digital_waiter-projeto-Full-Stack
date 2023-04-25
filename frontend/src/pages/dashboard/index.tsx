import { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

// MY IMPORTS
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';

import styles from './styles.module.scss';
import { Header } from '../../components/Header';

import { setupAPIClient } from '../../services/api';

// TIPANDO AS ORDERS
type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
    created_at: Date;
    updated_at: Date;
}

interface HomeProps{
    orders: OrderProps[];
}


export default function Dashboard({orders}: HomeProps){

    const [orderList, setOrderList] = useState(orders || []);

    function handleOpenModalView(id: string){
        alert(`Id clicado ${id}`);
    }

    return(
       <>
            <Head>
                <title>Painel - Dashboard</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Útimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color='#088C7F'/>
                        </button>
                    </div>

                    <article className={styles.listOrders}>
                        {
                            orderList.map(item=> (
                                <section key={item.id} className={styles.orderItem}>
                                    <button onClick={() => handleOpenModalView(item.id)}>
                                        <div className={styles.tag}></div>
                                        <span>Mesa {item.table}</span>
                                    </button>
                                </section>
                            ))
                        }

                    </article>
                </main>
            </div>
       </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('orders');
    
    //console.log(response);

    return{
        props: {
            orders: response.data
        }
    }
})