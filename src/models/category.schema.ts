import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './user.schema.ts';
import { relations } from 'drizzle-orm';
import { wordTable } from './word.schema.ts';
import { createInsertSchema } from 'drizzle-zod';

export const categoryTable = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar({ length: 50 }).notNull(),
  userId: uuid('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export const categoryRelation = relations(categoryTable, ({ one, many }) => ({
  users: one(userTable, {
    fields: [categoryTable.userId],
    references: [userTable.id],
  }),
  words: many(wordTable),
}));

export type ICategory = typeof categoryTable.$inferInsert;
export const NewCategorySchema = createInsertSchema(categoryTable).omit({ userId: true });
