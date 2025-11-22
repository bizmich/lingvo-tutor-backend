import z from "zod";

export * from "./user.schema";
export * from "./word.schema";

export const uuidSchema = z.object({
	id: z.uuid("Invalid ID format"),
});
