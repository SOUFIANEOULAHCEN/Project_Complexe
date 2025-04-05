import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
const PORT = 3000;
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
