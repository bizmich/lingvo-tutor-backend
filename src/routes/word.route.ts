import {
	createWord,
	deleteWordById,
	getAllWords,
	getWordById,
	updateWordById,
} from "@src/controllers/word.controller";
import { validateSchema } from "@src/middleware/validateSchema";
import { createWordSchema, updateWordSchema } from "@src/models/word.schema";
import { Router } from "express";

const wordRouter = Router();

wordRouter.get("/", getAllWords);
wordRouter.post("/", validateSchema(createWordSchema), createWord);
wordRouter.patch("/:id", validateSchema(updateWordSchema), updateWordById);
wordRouter.get("/:id", getWordById);
wordRouter.delete("/:id", deleteWordById);

export default wordRouter;
