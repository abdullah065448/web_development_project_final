import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { overview } from "../controllers/dashboard.controller.js";

const router = Router();

router.use(authenticate);
router.get("/", overview);

export default router;
