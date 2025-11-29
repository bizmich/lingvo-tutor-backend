import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { db } from "../db/index.ts";
import { type INewUser, userTable } from "../models/user.schema.ts";
import { createUserService } from "../services/user.service.ts";
import type { IRequest } from "../shared/types/index.ts";
import {
	comparePassword,
	hashPassword,
} from "../shared/utils/hash-password.ts";
import { generateToken } from "../shared/utils/jwt.ts";

export const registrationController = async (
	req: IRequest<INewUser>,
	res: Response,
) => {
	try {
		const { email, password, username, firstName, lastName } = req.body;

		const hashedPassword = await hashPassword(password);

		const [user] = await createUserService({
			email,
			password: hashedPassword,
			username,
			lastName,
			firstName,
		});

		const token = await generateToken({
			id: user.id,
			email: user.email,
			username: user.username,
		});

		res.status(201).json({ user, token });
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ error: "Failed to create user" });
	}
};

export const loginController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		// first find the user if its exists

		const [user] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, email));
		// if user does not exist send back error
		if (!user) {
			return res.status(404).json({ error: "Invalid credentials" });
		}

		// then compare the password with the hashed password
		const isValidPassword = await comparePassword(password, user.password);

		// if password is not valid send back error
		if (!isValidPassword) {
			return res.status(404).json({ error: "Invalid credentials" });
		}

		// if everything is ok generate a token and send it bac
		const token = await generateToken({
			email: user.email,
			id: user.id,
			username: user.username,
		});

		res.status(200).json({
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
			},
			token,
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Failed to login" });
	}
};
