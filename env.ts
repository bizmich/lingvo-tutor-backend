import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.coerce.number().positive().default(8800),
	DATABASE_URL: z.string().startsWith("postgresql://"),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
