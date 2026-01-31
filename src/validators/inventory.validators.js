import { z } from "zod";

export const adjustStockSchema = z.object({
  productId: z.string(),
  type: z.enum(["IN", "OUT"]),
  qty: z.number().int().min(1),
  note: z.string().optional(),
});
