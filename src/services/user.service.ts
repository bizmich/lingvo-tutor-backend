import { eq } from 'drizzle-orm';
import { db } from '../db/index.ts';
import { type INewUser, type IUpdateUser, userTable } from '../models/user.schema.ts';

export const createUserService = async (data: INewUser) => {
  return await db.insert(userTable).values(data).returning({
    id: userTable.id,
    email: userTable.email,
    username: userTable.username,
    firstName: userTable.firstName,
    lastName: userTable.lastName,
    createdAt: userTable.createdAt,
    updatedAt: userTable.updatedAt,
  });
};

export const updateUserByIdService = async (data: IUpdateUser) => {
  return await db
    .update(userTable)
    .set({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      updatedAt: new Date(),
    })
    .returning({
      id: userTable.id,
      email: userTable.email,
      username: userTable.username,
      firstName: userTable.firstName,
      lastName: userTable.lastName,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt,
    });
};

export const getAllUsersService = async () => {
  return await db
    .select({
      id: userTable.id,
      email: userTable.email,
      username: userTable.username,
      firstName: userTable.firstName,
      lastName: userTable.lastName,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt,
    })
    .from(userTable);
};
export const getUserByIdService = async (_id: string) => {
  return await db.query.userTable.findMany({
    where: eq(userTable.id, _id),
    with: {
      words: true,
    },
  });
};
export const deleteUserByIdService = async (id: string) => {
  return await db.delete(userTable).where(eq(userTable.id, id)).returning({ id: userTable.id });
};
