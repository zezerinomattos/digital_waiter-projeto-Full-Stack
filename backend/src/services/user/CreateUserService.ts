import prismaClient from "../../prisma";
import { hash } from "bcryptjs";


interface UserRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService{
    async execute({name, email, password}: UserRequest){

        // VERIFICAR SE ELE ENVIOU UM EMAIL
        if(!email){
            throw new Error("E-MAIL INCORRETO!");
        }

        // VERIFICAR SE ESSE EMAIL JÁ ESTÁ CADASTRADO NA PLATAFORMA
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists){
            throw new Error("USUÁRIO JÁ EXISTE!")
        }

        // VAMOS CRIPTOGRAFAR
        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            // VAMOS INFORMAR O QUE QUEREMOS DEVOLVER
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }