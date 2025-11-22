import { db } from "@src/db";
import {
	type ICreateWord,
	type IUpdateWord,
	wordTable,
} from "@src/models/word.schema";
import { ifExists } from "@src/shared/utils/if-exists";
import { eq } from "drizzle-orm";

export const getAllWordService = async () => {
	return await db.select().from(wordTable);
};

export const getWordByIdService = async (id: string) => {
	const _word = await ifExists(id);
	if (!_word) return null;
	return await db.select().from(wordTable).where(eq(wordTable.id, id));
};

export const createWordService = async (data: ICreateWord) => {
	return await db.insert(wordTable).values(data).returning();
};

export const updateWordByIdService = async (id: string, data: IUpdateWord) => {
	return await db
		.update(wordTable)
		.set(data)
		.where(eq(wordTable.id, id))
		.returning();
};

export const deleteWordByIdService = async (id: string) => {
	const findId = await ifExists(id);
	if (!findId) return null;
	return await db.delete(wordTable).where(eq(wordTable.id, id));
};
