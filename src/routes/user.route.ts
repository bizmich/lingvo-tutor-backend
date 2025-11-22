import {
	deleteUserByIdController,
	getAllUsersController,
	getUserByIdController,
	updateUserByIdController,
} from "@src/controllers/user.controller";
import { validateBody } from "@src/middleware/validateSchema";
import { userUpdateSchema } from "@src/models/user.schema";
import { Router } from "express";

const userRouter = Router();
userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.delete("/:id", deleteUserByIdController);
userRouter.patch(
	"/update/:id",
	validateBody(userUpdateSchema),
	updateUserByIdController,
);

export default userRouter;
