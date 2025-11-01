import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

/**
 * Generic middleware for validating request bodies using a Zod schema.
 */
export const validateSchema = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			// ✅ Validate request body
			schema.parse(req.body);
			next(); // Continue to controller if valid
		} catch (error) {
			if (error instanceof ZodError) {
				// ❌ If validation fails
				return res.status(400).json({
					message: "Validation failed",

					errors: error.issues.map((err) => ({
						field: err.path.join("."),
						message: err.message,
					})),
				});
			}

			// ⚠️ Unexpected error
			return res.status(500).json({
				message: "Internal server error",
			});
		}
	};
};
