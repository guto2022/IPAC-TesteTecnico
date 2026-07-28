import express from "express";

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "API funcionando!"
    });
});

app.post("/checklists", (req, res) => {
    console.log(req.body);

    res.status(201).json({
        message: "Checklist criado!",
        body: req.body
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});