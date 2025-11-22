import {
	integer,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const wordTable = pgTable("word", {
	id: uuid("id").primaryKey().defaultRandom(),
	word: varchar("word", { length: 255 }).notNull(),
	translation: varchar("translation", { length: 225 }).notNull(),
	hint: varchar("hint", { length: 255 }).notNull(),
	count: integer("count").default(0),
	status: varchar("status", { length: 50 }).default("new").notNull(),
	language: varchar("language", { length: 10 }).default("en").notNull(),
	createdAt: timestamp({ withTimezone: true }).defaultNow(),
	updatedAt: timestamp({ withTimezone: true }).defaultNow(),
});

export const createWordSchema = createInsertSchema(wordTable).extend({
	status: z
		.enum(
			["new", "learning", "learned"],
			"Must be either new, learning, learned",
		)
		.default("new"),
	count: z.number().max(10).min(0).default(0),
});

export type ICreateWord = typeof wordTable.$inferInsert;
export type IUpdateWord = typeof wordTable.$inferInsert;
