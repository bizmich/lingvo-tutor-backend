import type { Response } from "express";

export const ok = (
	response: Response,
	message: string | Record<string, unknown>,
	code: number,
) => {
	return response.status(code).json({ message });
};
