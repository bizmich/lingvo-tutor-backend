import type { INewUser } from "@src/models/user.schema";
import { createUserService } from "@src/services/user.service";
import type { IRequest } from "@src/shared/types";
import { hashPassword } from "@src/shared/utils/hash-password";
import type { Response } from "express";

export const registrationController = async (
	req: IRequest<INewUser>,
	_res: Response,
) => {
	try {
		const { email, password, username, firstName, lastName } = req.body;

		const hashedPassword = await hashPassword(password);

		const user = await createUserService({
			email,
			password: hashedPassword,
			username,
			lastName,
			firstName,
		});

		_res.status(201).json({ user, hashedPassword });
	} catch (error) {
		console.error(error);
	}
};

export const loginController = async (
	req: IRequest<INewUser>,
	_res: Response,
) => {
	try {
		const { email, password, username, firstName, lastName } = req.body;

		const hashedPassword = await hashPassword(password);

		const user = await createUserService({
			email,
			password: hashedPassword,
			username,
			lastName,
			firstName,
		});

		_res.status(201).json({ user, hashedPassword });
	} catch (error) {
		console.error(error);
	}
};
