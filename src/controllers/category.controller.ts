import type { Request, Response } from 'express';
import { db } from '../db/index.ts';
import { categoryTable } from '../models/category.schema.ts';
import type { IAuthRequest } from '../shared/types/index.ts';
import { and, eq } from 'drizzle-orm';

export const getAllCategories = async (_request: IAuthRequest, response: Response) => {
  try {
    const data = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.userId, _request.user.id));

    response.status(200).json({ data, count: data.length });
  } catch (error) {
    console.error('Get categories error:', error);
    response.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const createCategory = async (_request: IAuthRequest, response: Response) => {
  try {
    const userId = _request.user.id;

    console.log('🚀 ~ userId:', _request.user);

    const data = await db
      .insert(categoryTable)
      .values({ name: _request.body.name, userId })
      .returning();

    response.status(201).json({ data });
  } catch (error) {
    console.error('Cannot create category:', error);
    response.status(500).json({ error: 'Failed to create category' });
  }
};

export const deleteCategory = async (request: IAuthRequest, response: Response) => {
  try {
    const [deletedCategory] = await db
      .delete(categoryTable)
      .where(
        and(eq(categoryTable.id, request.params.id), eq(categoryTable.userId, request.user.id))
      )
      .returning();

    if (!deletedCategory) {
      return response.status(404).json({ error: 'Habit not found' });
    }

    response.json({ success: deleteCategory });
  } catch (error) {
    console.error('Delete category error:', error);
    response.status(500).json({ error: 'Failed to delete category' });
  }
};
