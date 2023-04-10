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

        return { ok: true}
    }
}

export { CreateProductServise }