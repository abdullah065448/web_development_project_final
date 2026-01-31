import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { productCreateSchema, productUpdateSchema } from "../validators/product.validators.js";
import { createProduct, deleteProduct, listProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", listProducts);
router.post("/", authorize("admin", "manager"), validate(productCreateSchema), createProduct);
router.patch("/:id", authorize("admin", "manager"), validate(productUpdateSchema), updateProduct);
router.delete("/:id", authorize("admin"), deleteProduct);

export default router;
