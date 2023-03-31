import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// VAMOS TIPAR
interface Payload{
    sub: string;   //sub é o ID
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    
    // Receber o token, sempre o toquem vem ai dentro
    const authToken = req.headers.authorization;

    // Verificar se tem o token, se não tiver barramos
    if(!authToken){
        return res.status(401).end();
    }
    
    const [, token] = authToken.split(" ")

    try {
        //Validar esses token.
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        req.user_id = sub;
        
        return next()

    } catch (err) {
        return res.status(401).end();
    }
}