import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const wordTable = pgTable("word", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	word: varchar("word", { length: 255 }).notNull(),
	translation: varchar("translation", { length: 225 }).notNull(),
	hint: varchar("hint", { length: 255 }).notNull(),
	status: varchar("status").default("new"),
});

export const createWordSchema = createInsertSchema(wordTable).extend({
	status: z
		.enum(
			["new", "learning", "learned"],
			"Must be either new, learning, learned",
		)
		.default("new"),
});

export const updateWordSchema = createSelectSchema(wordTable)
	.omit({ id: true })
	.partial();
