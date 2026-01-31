import { z } from "zod";

export const supplierCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const supplierUpdateSchema = supplierCreateSchema.partial();
