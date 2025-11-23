import { Router } from 'express';
import {
  createWord,
  deleteWordById,
  getAllWords,
  getWordById,
  updateWordById,
} from '../controllers/word.controller.ts';
import { validateBody, validateParams } from '../middleware/validateSchema.ts';
import { uuidSchema } from '../models/index.ts';
import { createWordSchema } from '../models/word.schema.ts';

const wordRouter = Router();

wordRouter.get('/', getAllWords);
wordRouter.post('/', validateBody(createWordSchema), createWord);
wordRouter.patch(
  '/:id',
  validateParams(uuidSchema),
  validateBody(createWordSchema),
  updateWordById
);
wordRouter.get('/:id', getWordById);
wordRouter.delete('/:id', deleteWordById);

export default wordRouter;
