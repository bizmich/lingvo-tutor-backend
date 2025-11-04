import wordRouter from "@routes/word.route";
import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/word", wordRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
