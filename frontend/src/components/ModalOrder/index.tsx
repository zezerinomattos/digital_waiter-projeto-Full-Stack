import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';

// MY IMPORTS
import styles from './style.module.scss';

// IMPORTANDO A TYPAGEM OrderItemProps DA PAGINA DASHBOARD
import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[];
    handleFinishModal: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishModal }: ModalOrderProps){

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} >
            
            <button type='button' onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color='#FF3F4B'/>
            </button>

            <div className={styles.container}>
                <h2>DETALHES DO PEDIDO</h2>
                <span className={styles.table}>Mesa: <strong>{order[0].order.table}</strong></span>

                {order.map(item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amount} - <strong>{item.product.name}</strong></span>
                        <span className={styles.description}>{item.product.description}</span>

                        <span className={styles.hour}>
                            Horario: {new Date(item.created_at).toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"})}
                        </span>
                    </section>
                ))}

                <button className={styles.buttonOrder} onClick={() => handleFinishModal(order[0].order_id) }>
                    Concluir pedido
                </button>

            </div>

        </Modal>
    )
}