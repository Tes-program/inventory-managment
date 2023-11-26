import {
  getAdjustmentById,
  getAllAdjustments,
  getStockAdjustments,
  getStockAdjustmentsByProductId,
  createAdjustment,
  createStockAdjustment
} from "../controllers/adjustmentsControllers";
import express from "express";


const AdjustmentRouter = express.Router();

AdjustmentRouter.get('/', getAllAdjustments)
AdjustmentRouter.get('/stock', getStockAdjustments)
AdjustmentRouter.get('/stock/:id', getStockAdjustmentsByProductId)
AdjustmentRouter.get('/:id', getAdjustmentById)
AdjustmentRouter.post('/create', createAdjustment)
AdjustmentRouter.post('/stock/create', createStockAdjustment)

export default AdjustmentRouter;
