import { Router } from 'express';
import { loginController, registrationController } from '../controllers/auth.controller.ts';
import { validateBody } from '../middleware/validateSchema.ts';
import { newUserInsertSchema } from '../models/user.schema.ts';
import { loginSchema } from '../shared/schemas/index.ts';

const authRouter = Router();

authRouter.post('/create', validateBody(newUserInsertSchema), registrationController);

authRouter.post('/login', validateBody(loginSchema), loginController);

export default authRouter;
