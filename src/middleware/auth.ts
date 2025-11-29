import type { NextFunction, Response } from 'express';
import type { IAuthRequest } from '../shared/types/index.ts';
import { verifyToken } from '../shared/utils/jwt.ts';

export const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payloads = await verifyToken(token);

  req.user = payloads;

  next();
};
