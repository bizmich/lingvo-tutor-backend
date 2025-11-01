import { db } from "@src/db";
import { wordSchema, wordTable } from "@src/models/word.schema";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

export const getAllWords = async (_req: Request, res: Response) => {
	try {
		const words = await db.select().from(wordTable);
		res
			.status(201)
			.json({ message: "Words fetched successfully", data: words });
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Invalid order data" });
	}
};
export const getWordById = async (request: Request, res: Response) => {
	try {
		const word = await db
			.select()
			.from(wordTable)
			.where(eq(wordTable.id, Number(request.params.id)));
		res.status(201).json({ message: "Word fetched successfully", data: word });
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Invalid order data" });
	}
};
export const createWord = async (request: Request, res: Response) => {
	try {
		const data = wordSchema.parse(request.body);
		const response = await db.insert(wordTable).values(data).returning();
		res
			.status(201)
			.json({ message: "Word created successfully", data: response });
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({
				message: "Failed to create word",
				error: error.message,
			});
		}
	}
};
export const updateWordById = async (_req: Request, res: Response) => {
	try {
		res.status(201).json("word");
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Invalid order data" });
	}
};
export const deleteWordById = async (_req: Request, res: Response) => {
	try {
		res.status(201).json("word");
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Invalid order data" });
	}
};
