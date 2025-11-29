import { Router } from "express";
import {
	deleteUserByIdController,
	getAllUsersController,
	getUserByIdController,
	updateUserByIdController,
} from "../controllers/user.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";
import { validateBody } from "../middleware/validateSchema.ts";
import { userUpdateSchema } from "../models/user.schema.ts";

const userRouter = Router();

userRouter.use(authMiddleware);
userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.delete("/:id", deleteUserByIdController);
userRouter.patch(
	"/update/:id",
	validateBody(userUpdateSchema),
	updateUserByIdController,
);

export default userRouter;
