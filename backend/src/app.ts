import "dotenv/config"
import express from "express";
import cors from "cors";
import itemRoutes from "./routes/item";
import checklistRoutes from "./routes/checklist";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ipac-teste-tecnico-nu.vercel.app/",
];

app.use(cors({
    origin: allowedOrigins
}));
app.use(express.json());


app.use("/items", itemRoutes);
app.use("/checklists", checklistRoutes);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});

app.get("/", () => {
    console.log("API está no ar!")
});