import {
    withdrawalHandler,
    getAllWithdrawals,
    getTotalWithdrawal,
    transferProfitToBalanceHandler,
} from "../controllers/withdrawal.controller";
import { Router } from "../lib/express";

const router = Router();

router.post("/", withdrawalHandler);
router.post("/transfer-profit-to-balance", transferProfitToBalanceHandler);
router.get("/all", getAllWithdrawals);
router.get("/total", getTotalWithdrawal);

export default router;
