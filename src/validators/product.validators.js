import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  category: z.string().min(2),
  quantity: z.number().int().min(0),
  cost: z.number().min(0),
  supplier: z.string().optional(),
  warehouseLocation: z.string().min(1),
  lowStockThreshold: z.number().int().min(0).optional(),
});

export const productUpdateSchema = productCreateSchema.partial();
