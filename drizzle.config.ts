import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./env.ts";

export default defineConfig({
	out: "./drizzle",
	schema: ["./src/models/user.schema.ts", "./src/models/word.schema.ts"],
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
