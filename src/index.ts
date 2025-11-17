import wordRouter from "@routes/word.route";
import cors from "cors";
import express from "express";
import { env } from "../env";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/word", wordRouter);

app.listen(env.PORT, () => {
	console.log(`Server is running on port ${env.PORT}`);
});
