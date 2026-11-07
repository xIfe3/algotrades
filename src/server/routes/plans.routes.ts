import {
    createPlan,
    editPlan,
    getAllPlans,
} from "../controllers/plans.controller";
import { Router } from "../lib/express";

const router = Router();
router.get("/", getAllPlans);

export default router;
