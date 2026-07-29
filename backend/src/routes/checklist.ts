import { Router } from "express";
import { getChecklists, createChecklist } from "../controllers/checklist";

const router = Router();

router.get("/", getChecklists);
router.post("/", createChecklist);

export default router;