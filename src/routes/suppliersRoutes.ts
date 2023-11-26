import {
  getAllSuppliers,
  getSupplierById,
  getSupplierTransactions,
  createSupplier,
  createSupplierTransaction
} from "../controllers/suppliersControllers";
import express from "express";


const SupplierRouter = express.Router();

SupplierRouter.get('/', getAllSuppliers)
SupplierRouter.get('/:id', getSupplierById)
SupplierRouter.get('/:id/transactions', getSupplierTransactions)
SupplierRouter.post('/create', createSupplier)
SupplierRouter.post('/createTransaction', createSupplierTransaction)

export default SupplierRouter;