import Product from "../models/Product.js";
import InventoryTransaction from "../models/InventoryTransaction.js";

export const overview = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const lowStock = await Product.find({ $expr: { $lte: ["$quantity", "$lowStockThreshold"] } }).limit(10);
    const totalQuantity = await Product.aggregate([{ $group: { _id: null, qty: { $sum: "$quantity" } } }]);
    const qtyValue = totalQuantity[0]?.qty || 0;

    const recent = await InventoryTransaction.find().sort({ createdAt: -1 }).limit(10).populate("product");

    const aggregates = await InventoryTransaction.aggregate([
      {
        $group: {
          _id: { type: "$type", day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } },
          total: { $sum: "$qty" },
        },
      },
      { $sort: { "_id.day": -1 } },
      { $limit: 14 },
    ]);

    res.json({ totalProducts, lowStock, totalQuantity: qtyValue, recent, aggregates });
  } catch (err) {
    next(err);
  }
};
