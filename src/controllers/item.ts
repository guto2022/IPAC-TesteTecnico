import prisma from "../prisma/prisma";
import { Request, Response } from "express";
import { internalServerError } from "../exceptions/internalServerError";


export async function getItems(req: Request, res: Response){
    try {
        const items = await prisma.item.findMany();
        return res.status(200).json(items)
    } catch (error) {
        return internalServerError(res, error);
    }
}

export async function createItem(req: Request, res: Response){
    try {
        const { description } = req.body;
        
        if(!description || description.trim() === ""){
            return res.status(400).json({
                error: "description is required"
            });
        }

        const newItem = await prisma.item.create({
            data: {
                description: description.trim()
            }
        });

        return res.status(201).json(newItem)
    } catch (error) {
        return internalServerError(res, error);
    }
}