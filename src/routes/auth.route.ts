import { Router } from 'express';
import { registrationController } from '../controllers/auth.controller.ts';

const authRouter = Router();

authRouter.post('/create', registrationController);

export default authRouter;
