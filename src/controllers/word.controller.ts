import { eq } from 'drizzle-orm';

import type { Request, Response } from 'express';
import { db } from '../db/index.ts';
import { type ICreateWord, type IUpdateWord, wordTable } from '../models/word.schema.ts';
import {
  createWordService,
  deleteWordByIdService,
  getAllWordService,
  getWordByIdService,
  updateWordByIdService,
} from '../services/word.service.ts';
import type { IRequest } from '../shared/types/index.ts';
import { notFound, ok } from '../shared/utils/if-ok.ts';

export const getAllWords = async (_request: Request, response: Response) => {
  try {
    const data = await getAllWordService();

    response.status(200).json({ data, count: data.length });
  } catch (error) {
    console.error('Get words error:', error);
    response.status(500).json({ error: 'Failed to fetch words' });
  }
};

export const getWordById = async (request: Request, response: Response) => {
  try {
    const word = await getWordByIdService(request.params.id);
    if (!word) return notFound(response);
    ok(response, { data: word }, 200);
  } catch (error) {
    console.error('Get word error:', error);
    response.status(500).json({ error: 'Failed to fetch word' });
  }
};
export const createWord = async (request: IRequest<ICreateWord>, response: Response) => {
  try {
    const data = await createWordService(request.body);
    response.status(201).json({ data });
  } catch (error) {
    console.error('Create word error:', error);
    response.status(500).json({ error: 'Failed to create word' });
  }
};
export const updateWordById = async (request: IRequest<IUpdateWord>, response: Response) => {
  try {
    const [isWord] = await db.select().from(wordTable).where(eq(wordTable.id, request.params.id));

    if (!isWord) {
      return response.status(401).json({ error: 'Word is not found' });
    }

    const data = await updateWordByIdService(request.params.id, request.body);

    return response.status(200).json({ data });
  } catch (error) {
    console.error('Update word error:', error);
    response.status(500).json({ error: 'Failed to update wordddd' });
  }
};
export const deleteWordById = async (request: Request, response: Response) => {
  try {
    const findId = await deleteWordByIdService(request.params.id);
    if (!findId) notFound(response);
    else ok(response, { message: 'Word deleted successfully' }, 200);
  } catch (error) {
    console.error('Delete word error:', error);
    response.status(500).json({ error: 'Failed to delete word' });
  }
};
