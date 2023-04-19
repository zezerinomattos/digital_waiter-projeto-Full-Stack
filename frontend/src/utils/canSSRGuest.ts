import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

// FUNÇÃO PARA PAGINAS QUE SÓ PODE SER ACESSADA POR USUÁRIO NAO LOGADO
export function canSSRGuest<P>(fn: GetServerSideProps <P>){
    return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult <P> > => {
        
        const cookies = parseCookies(ctx);

        // Se o usuário tentar acessar a pagina porem tendo já um login salvo redirecionamos
        if(cookies['@digitalwaiter']){
            return {
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        
        return await fn(ctx);
    }
}