import "dotenv/config"
import express from "express";
import itemRoutes from "./routes/item";
import checklistRoutes from "./routes/checklist";

const app = express();
app.use(express.json());


app.use("/items", itemRoutes);
app.use("/checklists", checklistRoutes);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});