import prisma from "../prisma/prisma";
import { Request, Response } from "express";
import { internalServerError } from "../exceptions/internalServerError";
import { ChecklistStatus } from "../generated/prisma/enums";


export async function getChecklists(req: Request, res: Response){
    try {
        const { status } = req.query;

        const checklists = await prisma.checklist.findMany({
            where: status ? {
                status: status as ChecklistStatus
            } : undefined,

            include: {
                checklistItems: {
                    include: {
                        item: true
                    }
                }
            }
        });
        return res.status(200).json(checklists)
    } catch (error) {
        return internalServerError(res, error)
    }
}

export async function createChecklist(req: Request, res: Response){
    try {
        const { name, description, status, itemIds } = req.body;

        if(!name || name.trim() === ""){
            return res.status(400).json({
                error: "name is required"
            });
        }

        if(!status){
            return res.status(400).json({
                error: "status is required"
            });
        }

        if(status !== ChecklistStatus.RASCUNHO && status !== ChecklistStatus.PRONTO){
            return res.status(400).json({
                error: "status 'RASCUNHO' or 'PRONTO' is required"
            });
        }

        if(!Array.isArray(itemIds) || itemIds.length === 0){
            return res.status(400).json({
                error: "At least one item is required"
            });
        }

        const newChecklist = await prisma.checklist.create({
            data: {
                name: name.trim(), 
                description: description?.trim(), 
                status,
                checklistItems: {
                    create: itemIds.map((id) => ({
                        itemId: id
                    }))
                }
            },

            include: {
                checklistItems: {
                    include: {
                        item: true
                    }
                }
            }
        });

        return res.status(201).json(newChecklist)
    } catch (error) {
        return internalServerError(res, error)
    }
    
}