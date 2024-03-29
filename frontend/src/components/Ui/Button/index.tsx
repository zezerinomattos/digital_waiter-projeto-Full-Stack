import { ReactNode, ButtonHTMLAttributes} from 'react';
import { FaSpinner } from 'react-icons/fa';

// MY IMPORTS
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean, // ? para diser que não é obrigatório
    children: ReactNode,
}

export function Button({ loading, children, ...rest}: ButtonProps){
    return(
        <button className={styles.button} disabled={loading} {...rest}>
            {
                loading ? (<FaSpinner color='#FFF' size={16}/>)
                : 
                    (<a className={styles.buttonText}>{children}</a>)
            }
        </button>
    );
}