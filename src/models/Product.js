import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true, uppercase: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    cost: { type: Number, required: true, min: 0 },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    warehouseLocation: { type: String, required: true },
    lowStockThreshold: { type: Number, default: 5 },
  },
  { timestamps: true }
);

productSchema.index({ sku: 1 });
productSchema.index({ category: 1 });

export default mongoose.model("Product", productSchema);
