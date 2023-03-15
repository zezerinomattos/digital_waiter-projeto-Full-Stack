import { Router } from 'express';

import { CreateUserController } from '../controllers/user/CreateUserController';
import { AuthUserController } from '../controllers/user/AuthUserController';
import { DetailUserController } from '../controllers/user/DetailUserController';

const router = Router();

// -- ROTAS USERS --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', new DetailUserController().handle);

export {router};