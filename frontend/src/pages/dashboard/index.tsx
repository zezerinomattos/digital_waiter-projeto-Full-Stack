import { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import Modal from 'react-modal';

// MY IMPORTS
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';

import styles from './styles.module.scss';
import { Header } from '../../components/Header';

import { setupAPIClient } from '../../services/api';
import { api } from '../../services/apiClient';

import { ModalOrder } from '../../components/ModalOrder';

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

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }

    created_at: Date;
}


export default function Dashboard({orders}: HomeProps){

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false);

    //FECHAR MODAL
    function handleCloseModal(){
        setModalVisible(false)
    }

    // ABRIR MODAL
    async function handleOpenModalView(id: string){
        
        await api.get('/order/detail', {
            params: {
                order_id: id,
            }
        })
        .then(response => {
            setModalItem(response.data);
            setModalVisible(true);
        })
    }

    Modal.setAppElement('#__next');

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

                                    <span className={styles.dateHour}>
                                        {`${new Date(item.created_at).toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"})} 
                                        - ${new Date(item.created_at).toLocaleDateString("pt-BR")}`}
                                    </span>
                                </section>
                            ))
                        }

                    </article>
                </main>
                
                {
                    modalVisible && modalItem && modalItem.length > 0 && (
                        <ModalOrder isOpen={modalVisible} 
                            onRequestClose={handleCloseModal} 
                            order={modalItem} 
                        />
                    )
                }
                
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