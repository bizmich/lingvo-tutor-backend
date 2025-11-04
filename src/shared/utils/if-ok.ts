import type { Response } from "express";

export const ok = (
	response: Response,
	data: string | Record<string, unknown>,
	code: number,
) => {
	return response.status(code).json(data);
};
