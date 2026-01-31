import mongoose from "mongoose";

const inventoryTransactionSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    type: { type: String, enum: ["IN", "OUT"], required: true },
    qty: { type: Number, required: true, min: 1 },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    note: { type: String },
  },
  { timestamps: true }
);

inventoryTransactionSchema.index({ createdAt: -1 });
inventoryTransactionSchema.index({ product: 1, createdAt: -1 });

export default mongoose.model("InventoryTransaction", inventoryTransactionSchema);
