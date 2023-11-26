import {
  getAllTransactions,
  getTransactionById,
  createTransaction
} from "../controllers/transactionControllers";
import express from "express";


const TransactionRouter = express.Router();

TransactionRouter.get('/', getAllTransactions)
TransactionRouter.get('/:id', getTransactionById)
TransactionRouter.post('/create', createTransaction)

export default TransactionRouter;