import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(){

        // O FINDMANY TRAZ TUDO O QUE TIVER NO BANCO
        const category = await prismaClient.category.findMany({
            // VOU PEDIR PARA ELE TRAZER APENAS ID E NAME
            select: {
                id: true,
                name: true,
            }
        })
        return category
    }
}

export { ListCategoryService }