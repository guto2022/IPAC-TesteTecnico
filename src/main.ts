import "dotenv/config"
import express from "express";
import prisma from "./prisma/prisma";

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "API funcionando!"
    });
});

app.get("/items", async (req, res) => {
    const items = await prisma.item.findMany();
    return res.json(items)
});

app.get("/checklists", async (req, res) => {
    const checklists = await prisma.checklist.findMany();
    return res.json(checklists)
});

app.post("/items", async (req, res) => {
    const { description } = req.body;
    
    if(!description){
        return res.status(400).json({ error: "description is required"});
    }

    const newItem = await prisma.item.create({
        data: { description }
    });

    return res.status(201).json(newItem)
});

app.post("/checklists", async (req, res) => {
    const { name, description, status } = req.body;

    if(!name){
        return res.status(400).json({ error: "name is required"});
    }

    if(!status){
        return res.status(400).json({ error: "status is required"});
    }

    if(status !== "RASCUNHO" && status !== "PRONTO"){
        return res.status(400).json({error: "status 'RASCUNHO' or 'PRONTO' is required"})
    }

    const newChecklist = await prisma.checklist.create({
        data: { name, description, status }
    });

    return res.status(201).json(newChecklist)
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});