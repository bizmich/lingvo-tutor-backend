import { handleError } from "@shared/utils/handle-error";
import { ifExists } from "@shared/utils/if-exists";
import { createWordSchema, updateWordSchema } from "@src/models/word.schema";

import {
	createWordService,
	deleteWordByIdService,
	getAllWordService,
	getWordByIdService,
	updateWordByIdService,
} from "@src/services/word.service";
import { ok } from "@src/shared/utils/if-ok";

import type { Request, Response } from "express";

export const getAllWords = async (_request: Request, response: Response) => {
	try {
		const words = await getAllWordService();
		ok(response, { message: "Words fetched successfully", data: words }, 200);
	} catch (error) {
		handleError(response, error, "Failed to fetch words");
	}
};

export const getWordById = async (request: Request, response: Response) => {
	try {
		const word = await getWordByIdService(Number(request.params.id));
		if (!word) return ok(response, "Not found", 404);
		ok(response, { message: "Word fetched successfully", data: word }, 200);
	} catch (error) {
		handleError(
			response,
			error,
			error instanceof Error ? error.message : "Failed to fetch word",
		);
	}
};
export const createWord = async (request: Request, response: Response) => {
	try {
		const data = createWordSchema.parse(request.body);
		const res = createWordService(data);
		ok(response, { message: "Word created successfully", data: res }, 201);
	} catch (error) {
		handleError(response, error, "Failed to create word");
	}
};
export const updateWordById = async (request: Request, response: Response) => {
	try {
		const data = updateWordSchema.parse(request.body);
		const res = await updateWordByIdService(Number(request.params.id), data);
		if (!res) {
			ok(response, { message: "Not found", data: res }, 404);
		} else {
			ok(response, { message: "Word updated successfully", data: res }, 201);
		}
	} catch (error) {
		handleError(response, error, "Failed to update word");
	}
};
export const deleteWordById = async (request: Request, response: Response) => {
	try {
		const findId = await ifExists(Number(request.params.id));
		if (!findId) {
			ok(response, { message: "Not found" }, 404);
		}
		await deleteWordByIdService(Number(request.params.id));

		ok(response, { message: "Word deleted successfully" }, 200);
	} catch (error) {
		handleError(response, error, "Failed to delete word");
	}
};
