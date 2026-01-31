import { adjustStock } from "../services/inventory.service.js";
import InventoryTransaction from "../models/InventoryTransaction.js";

export const stockAdjust = async (req, res, next) => {
  try {
    const result = await adjustStock({
      productId: req.body.productId,
      type: req.body.type,
      qty: req.body.qty,
      actorId: req.user.userId,
      note: req.body.note,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const recentTransactions = async (req, res, next) => {
  try {
    const items = await InventoryTransaction.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("product")
      .populate("actor", "name role");
    res.json(items);
  } catch (err) {
    next(err);
  }
};
