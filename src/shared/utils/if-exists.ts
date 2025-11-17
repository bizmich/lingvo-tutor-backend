import { db } from "@src/db";
import { wordTable } from "@src/models/word.schema";
import { eq } from "drizzle-orm";

export const ifExists = async (id: string) => {
	const result = await db.select().from(wordTable).where(eq(wordTable.id, id));
	return result.length > 0 ? result[0] : null;
};
