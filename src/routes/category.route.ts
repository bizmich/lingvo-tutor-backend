import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from '../controllers/category.controller.ts';
import { authMiddleware } from '../middleware/auth.ts';
import { validateBody, validateParams } from '../middleware/validateSchema.ts';
import { NewCategorySchema } from '../models/category.schema.ts';
import { uuidSchema } from '../shared/schemas/index.ts';

const router = Router();
router.use(authMiddleware);
router.get('/', getAllCategories);
router.post('/', validateBody(NewCategorySchema), createCategory);
router.delete('/:id', validateParams(uuidSchema), deleteCategory);
export default router;
