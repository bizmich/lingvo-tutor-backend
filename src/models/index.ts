import z from 'zod';

export * from './user.schema.ts';
export * from './word.schema.ts';

export const uuidSchema = z.object({
  id: z.uuid('Invalid ID format'),
});
