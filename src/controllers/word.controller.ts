import { handleError } from "@shared/utils/handle-error";
import { createWordSchema, updateWordSchema } from "@src/models/word.schema";

import {
	createWordService,
	deleteWordByIdService,
	getAllWordService,
	getWordByIdService,
	updateWordByIdService,
} from "@src/services/word.service";
import { notFound, ok } from "@src/shared/utils/if-ok";

import type { Request, Response } from "express";

export const getAllWords = async (_request: Request, response: Response) => {
	try {
		const { count, data } = await getAllWordService();

		ok(response, { data: data, count }, 200);
	} catch (error) {
		handleError(response, error, "Failed to fetch words");
	}
};

export const getWordById = async (request: Request, response: Response) => {
	try {
		const word = await getWordByIdService(request.params.id);
		if (!word) return notFound(response);
		ok(response, { data: word }, 200);
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
		const res = await createWordService(data);
		ok(response, { message: "Word created successfully", data: res }, 201);
	} catch (error) {
		handleError(response, error, "Failed to create word");
	}
};
export const updateWordById = async (request: Request, response: Response) => {
	try {
		const data = updateWordSchema.parse(request.body);
		const res = await updateWordByIdService(request.params.id, data);
		if (!res)
			if (!data) notFound(response);
			else
				ok(response, { message: "Word updated successfully", data: res }, 201);
	} catch (error) {
		handleError(response, error, "Failed to update word");
	}
};
export const deleteWordById = async (request: Request, response: Response) => {
	try {
		const findId = await deleteWordByIdService(request.params.id);
		if (!findId) notFound(response);
		else ok(response, { message: "Word deleted successfully" }, 200);
	} catch (error) {
		handleError(response, error, "Failed to delete word");
	}
};
