import z from 'zod';
export const uuidSchema = z.object({
  id: z.uuid('Invalid ID format'),
});

export const loginSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(1, 'Password must be at least 6 characters'),
});
