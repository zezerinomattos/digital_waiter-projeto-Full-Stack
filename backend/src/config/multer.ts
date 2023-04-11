// O CRYPTO JÁ VEM COM O NODE NÃO PRECISA IMPORTAR
// VAMOS USAR ELE APENAS PARA GERAR ALGUMAS COISAS 
// COMO NÃO DEIXAR QUE IMAGENS SE REPITAM 
import crypto from 'crypto';
import { request } from 'express';
import multer from 'multer';

// O PATH TAMBEM JÁ VEM E USAMOS PARA PEGAR OS CAMINHOS
import { extname, resolve } from 'path';

export default{
    upload(folder: string){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }
}