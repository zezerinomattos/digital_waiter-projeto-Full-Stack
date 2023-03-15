import { Router } from 'express';

import { CreateUserController } from '../controllers/user/CreateUserController';
import { AuthUserController } from '../controllers/user/AuthUserController';

const router = Router();

// -- ROTAS USERS --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

export {router};