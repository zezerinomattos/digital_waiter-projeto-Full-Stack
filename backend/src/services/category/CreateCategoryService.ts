import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){
        
        if(name === ''){
            throw new Error('Nome invalido')
        }

        // Verificar se a categoria já existe
        // Aqui foi alterado do projeto original.
        const existingCategory = await prismaClient.category.findFirst({
            where: { name },
        })

        if(existingCategory){
            throw new Error('Categoria já cadastrada')
        }

        //Vamos criar e retornar id e nome cadastrado, caso o fronte queira usar
        const category = await prismaClient.category.create({
            data:{
                name: name,
            },
            select:{
                id: true,
                name: true,
            }
        })

        return category;
    }
}

export { CreateCategoryService }
