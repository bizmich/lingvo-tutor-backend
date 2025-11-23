import { eq } from 'drizzle-orm';
import { db } from '../../db/index.ts';
import { wordTable } from '../../models/word.schema.ts';

export const ifExists = async (id: string) => {
  const result = await db.select().from(wordTable).where(eq(wordTable.id, id));
  return result.length > 0 ? result[0] : null;
};
