import Supplier from "../models/Supplier.js";

export const listSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    next(err);
  }
};

export const createSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    next(err);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(supplier);
  } catch (err) {
    next(err);
  }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
