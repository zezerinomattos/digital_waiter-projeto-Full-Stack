import { useContext } from 'react';
import Link from 'next/link';

// Icone de LogOut
import { FiLogOut } from 'react-icons/fi';

// MY IMPORTS
import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';

export function Header(){

    const { signOut, user } = useContext(AuthContext);

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/'>
                    <img src="/Logo WaiterFull.png" alt="Imagem da Logo" width={190} height={50} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/category'>
                        Categoria
                    </Link>

                    <Link href='/product'>
                        Cardapio
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24}/>
                    </button>

                    <a className='navUser'>{user?.name}</a>
                </nav>
            </div>
        </header>
    )
}