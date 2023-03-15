
import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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
        
        // SE DEU TUDO CERTO VAMOS GERAR O TOKEN PRO USUÁRIO
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            // O JWT_SECRET é o nome que damos para nossa variavel lá no aquivo .env
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'   //estou dizendo que inspira esse token em 30dias
            }
            
        )
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };