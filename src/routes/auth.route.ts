import { registrationController } from "@src/controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/create", registrationController);

export default authRouter;
