import {
	createWord,
	deleteWordById,
	getAllWords,
	getWordById,
	updateWordById,
} from "@src/controllers/word.controller";
import { validateBody, validateParams } from "@src/middleware/validateSchema";
import { uuidSchema } from "@src/models";
import { createWordSchema } from "@src/models/word.schema";
import { Router } from "express";

const wordRouter = Router();

wordRouter.get("/", getAllWords);
wordRouter.post("/", validateBody(createWordSchema), createWord);
wordRouter.patch(
	"/:id",
	validateParams(uuidSchema),
	validateBody(createWordSchema),
	updateWordById,
);
wordRouter.get("/:id", getWordById);
wordRouter.delete("/:id", deleteWordById);

export default wordRouter;
