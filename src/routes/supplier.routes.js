import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { supplierCreateSchema, supplierUpdateSchema } from "../validators/supplier.validators.js";
import { createSupplier, deleteSupplier, listSuppliers, updateSupplier } from "../controllers/supplier.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", listSuppliers);
router.post("/", authorize("admin", "manager"), validate(supplierCreateSchema), createSupplier);
router.patch("/:id", authorize("admin", "manager"), validate(supplierUpdateSchema), updateSupplier);
router.delete("/:id", authorize("admin"), deleteSupplier);

export default router;
