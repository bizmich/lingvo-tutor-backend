import { db } from "@src/db";
import { type INewUser, type IUpdateUser, user } from "@src/models/user.schema";
import { eq } from "drizzle-orm";

export const createUserService = async (data: INewUser) => {
	return await db.insert(user).values(data).returning();
};

export const updateUserByIdService = async (data: IUpdateUser) => {
	return await db
		.update(user)
		.set({
			firstName: data.firstName,
			lastName: data.lastName,
			username: data.username,
			updatedAt: new Date(),
		})
		.returning({
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
};

export const getAllUsersService = async () => {
	return await db
		.select({
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		})
		.from(user);
};
export const getUserByIdService = async (id: string) => {
	return await db
		.select({
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		})
		.from(user)
		.where(eq(user.id, id));
};
export const deleteUserByIdService = async (id: string) => {
	return await db
		.delete(user)
		.where(eq(user.id, id))
		.returning({ id: user.id });
};
