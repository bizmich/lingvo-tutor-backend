import { db } from "@src/db";
import { wordTable } from "@src/models/word.schema";
import { ifExists } from "@src/shared/utils/if-exists";
import { eq } from "drizzle-orm";

export const getAllWordService = async () => {
	const data = await db.select().from(wordTable);
	const count = data.length;

	return { data, count };
};

export const getWordByIdService = async (id: number) => {
	const word = await ifExists(id);
	if (!word) return null;
	return await db.select().from(wordTable).where(eq(wordTable.id, id));
};

export const createWordService = async (
	_data: Omit<typeof wordTable.$inferInsert, "id">,
) => {
	return await db.insert(wordTable).values(_data).returning();
};

export const updateWordByIdService = async (
	id: number,
	data: Partial<Omit<typeof wordTable.$inferInsert, "id">>,
) => {
	const findId = await ifExists(Number(id));
	if (!findId) return null;

	return await db
		.update(wordTable)
		.set(data)
		.where(eq(wordTable.id, Number(id)))
		.returning();
};

export const deleteWordByIdService = async (id: number) => {
	const findId = await ifExists(Number(id));
	if (!findId) return null;
	return await db.delete(wordTable).where(eq(wordTable.id, Number(id)));
};
