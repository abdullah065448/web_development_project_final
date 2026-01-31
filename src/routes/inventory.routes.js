import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { adjustStockSchema } from "../validators/inventory.validators.js";
import { recentTransactions, stockAdjust } from "../controllers/inventory.controller.js";

const router = Router();

router.use(authenticate);

router.post("/adjust", authorize("admin", "manager"), validate(adjustStockSchema), stockAdjust);
router.get("/recent", recentTransactions);

export default router;
