
import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        //VERIFICAR SE O EMAIL EXISTE.
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user){
            throw new Error("User/password incorrect!");
        }

        // PRECISO VERIFICAR SE A SENHA QUE ELE MANDOU ESTÁ CORRETA.
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User/password incorrect!");
        }
        
        //VAMOS GERAR UM TOKEN JWT E DEVOLVER OS DADOS DO USUÁRIO COMO ID, NAME E EMAIL
        

        return {ok: true}
    }
}

export { AuthUserService };