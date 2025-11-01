import {
	createWord,
	deleteWordById,
	getAllWords,
	getWordById,
	updateWordById,
} from "@src/controllers/word.controller";
import { validateSchema } from "@src/middleware/validateSchema";
import { wordSchema } from "@src/models/word.schema";
import { Router } from "express";

const wordRouter = Router();

wordRouter.get("/", getAllWords);
wordRouter.post("/", validateSchema(wordSchema), createWord);
wordRouter.get("/:id", getWordById);
wordRouter.patch("/:id", updateWordById);
wordRouter.delete("/:id", deleteWordById);

export default wordRouter;
