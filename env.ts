import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ debug: true });

const envSchema = z.object({
  PORT: z.coerce.number().positive().default(8800),
  DATABASE_URL: z.string().startsWith('postgresql://'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().min(4).max(31).default(12),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
