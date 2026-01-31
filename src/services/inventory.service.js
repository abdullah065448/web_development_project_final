import mongoose from "mongoose";
import Product from "../models/Product.js";
import InventoryTransaction from "../models/InventoryTransaction.js";

export async function adjustStock({ productId, type, qty, actorId, note }) {
  if (qty <= 0) throw new Error("Quantity must be positive");
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await Product.findById(productId).session(session);
    if (!product) throw new Error("Product not found");

    const delta = type === "IN" ? qty : -qty;
    const newQty = product.quantity + delta;
    if (newQty < 0) throw new Error("Insufficient stock");

    product.quantity = newQty;
    await product.save({ session });

    await InventoryTransaction.create(
      [{ product: productId, type, qty, actor: actorId, note }],
      { session }
    );

    await session.commitTransaction();
    return { product, quantity: newQty };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
