import wordRouter from "@routes/word.route";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/word", wordRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
