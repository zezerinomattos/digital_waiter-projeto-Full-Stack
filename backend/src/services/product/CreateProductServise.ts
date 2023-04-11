import prismaClient from "../../prisma";

interface ProductResquest{
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductServise{
    async execute({name, price, description, banner, category_id}: ProductResquest){

        const product = await prismaClient.product.create({
            data:{
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
            }
        })
        return product
    }
}

export { CreateProductServise }