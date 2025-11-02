import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const wordTable = pgTable("word", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	word: varchar({ length: 255 }).notNull(),
	translation: varchar({ length: 225 }).notNull(),
	hint: varchar({ length: 255 }).notNull().unique(),
});

export const createWordSchema = createSelectSchema(wordTable).omit({
	id: true,
});

export const updateWordSchema = createSelectSchema(wordTable)
	.omit({ id: true })
	.partial();
