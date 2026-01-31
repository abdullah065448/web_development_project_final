import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

supplierSchema.index({ name: 1 });

export default mongoose.model("Supplier", supplierSchema);
