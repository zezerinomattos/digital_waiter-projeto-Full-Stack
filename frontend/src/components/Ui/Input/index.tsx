import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

//MY IMPORTS
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps){
    return(
        <input className={styles.input} {...rest} />
    )
}

export function TextArea({...rest}: TextProps){
    return(
        <textarea className={styles.input} {...rest}> </textarea>
    )
}