import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const wordTable = pgTable("word", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	word: varchar({ length: 255 }).notNull(),
	translation: varchar({ length: 225 }).notNull(),
	hint: varchar({ length: 255 }).notNull().unique(),
});

export const wordSchema = createSelectSchema(wordTable, {
	word: (schema) => schema.min(3, "Word must be at least 3 characters long"),
}).omit({ id: true });
