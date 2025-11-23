import type { Request, Response } from 'express';
import type { IUpdateUser } from '../models/user.schema.ts';
import {
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from '../services/user.service.ts';
import type { IRequest } from '../shared/types/index.ts';

export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    return res.status(200).json({ data: users, count: users.length });
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [user] = await getUserByIdService(id);
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
export const updateUserByIdController = async (req: IRequest<IUpdateUser>, res: Response) => {
  try {
    const [user] = await updateUserByIdService(req.body);
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};
export const deleteUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = await deleteUserByIdService(id);
    return res.status(200).json({ data: userId });
  } catch (error) {
    console.error('Can not delete the user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
