import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';
import { userTable } from './user.schema.ts';
import { categoryTable } from './category.schema.ts';

export const wordTable = pgTable('words', {
  id: uuid('id').primaryKey().defaultRandom(),
  word: varchar('word', { length: 255 }).notNull(),
  translation: varchar('translation', { length: 225 }).notNull(),
  hint: varchar('hint', { length: 255 }).notNull(),
  count: integer('count').default(0),
  status: varchar('status', { length: 50 }).default('new').notNull(),
  language: varchar('language', { length: 10 }).default('en').notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow(),
  userId: uuid('user_id')
    .references(() => userTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  categoryId: uuid('category_id').references(() => categoryTable.id, {
    onDelete: 'cascade',
  }),
});

export const wordRelations = relations(wordTable, ({ one }) => ({
  users: one(userTable, {
    fields: [wordTable.userId],
    references: [userTable.id],
  }),
  categories: one(categoryTable, {
    fields: [wordTable.categoryId],
    references: [categoryTable.id],
  }),
}));

export const createWordSchema = createInsertSchema(wordTable)
  .omit({ userId: true })
  .extend({
    status: z
      .enum(['new', 'learning', 'learned'], 'Must be either new, learning, learned')
      .default('new'),
    count: z.number().max(10).min(0).default(0),
  });

export type ICreateWord = typeof wordTable.$inferInsert;
export type IUpdateWord = typeof wordTable.$inferInsert;
