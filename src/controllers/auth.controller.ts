import type { Response } from 'express';
import type { INewUser } from '../models/user.schema.ts';
import { createUserService } from '../services/user.service.ts';
import type { IRequest } from '../shared/types/index.ts';
import { hashPassword } from '../shared/utils/hash-password.ts';

export const registrationController = async (req: IRequest<INewUser>, _res: Response) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await createUserService({
      email,
      password: hashedPassword,
      username,
      lastName,
      firstName,
    });

    _res.status(201).json({ user, hashedPassword });
  } catch (error) {
    console.error(error);
  }
};

export const loginController = async (req: IRequest<INewUser>, _res: Response) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await createUserService({
      email,
      password: hashedPassword,
      username,
      lastName,
      firstName,
    });

    _res.status(201).json({ user, hashedPassword });
  } catch (error) {
    console.error(error);
  }
};
