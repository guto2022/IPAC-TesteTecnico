import prisma from "../prisma/prisma";
import { Request, Response } from "express";


export async function getChecklists(req: Request, res: Response){
    const checklists = await prisma.checklist.findMany();
    return res.json(checklists)
}

export async function createChecklist(req: Request, res: Response){
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
}


