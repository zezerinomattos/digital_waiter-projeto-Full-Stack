import { Request, Response } from 'express';

import { CreateProductServise } from '../../services/product/CreateProductServise';

class CreateProductController{
    async handle(req: Request, res: Response){
        const { name, price, description, category_id } = req.body;

        // por enquanto
        let banner = ''

        const createProductServise = new CreateProductServise();
        const product = await createProductServise.execute({
            name,
            price,
            description,
            banner,
            category_id
        });
        return res.json(product);
    }
}

export { CreateProductController }