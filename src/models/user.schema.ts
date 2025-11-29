import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { wordTable } from './word.schema.ts';
import { categoryTable } from './category.schema.ts';

export const userTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  words: many(wordTable),
  categories: many(categoryTable),
}));

export const userUpdateSchema = z.object({
  email: z.email('Invalid email format').optional(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long')
    .optional(),
  firstName: z.string().max(50, 'First name too long').optional(),
  lastName: z.string().max(50, 'Last name too long').optional(),
});
export const newUserInsertSchema = createInsertSchema(userTable, {
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password too long'),
});

export type INewUser = typeof userTable.$inferInsert;
export type IUpdateUser = z.infer<typeof userUpdateSchema>;
