import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '../../env.ts';

import {
  categoryRelation,
  categoryTable,
  userRelations,
  userTable,
  wordRelations,
  wordTable,
} from '../models/index.ts';
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const _schemas = {
  userTable,
  wordTable,
  userRelations,
  wordRelations,
  categoryTable,
  categoryRelation,
};
export const db = drizzle({
  client: pool,
  schema: _schemas,
});
