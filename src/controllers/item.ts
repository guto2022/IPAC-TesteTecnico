import prisma from "../prisma/prisma";
import { Request, Response } from "express";


export async function getItems(req: Request, res: Response){
    const items = await prisma.item.findMany();
    return res.json(items)
}

export async function createItem(req: Request, res: Response){
    const { description } = req.body;
    
    if(!description){
        return res.status(400).json({ error: "description is required"});
    }

    const newItem = await prisma.item.create({
        data: { description }
    });

    return res.status(201).json(newItem)
}