import {
  getAllProducts,
  getProductById,
  getProductPriceAdjustmentHistory,
  getProductTransactionHistory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers";
import express from "express";


const ProductRouter = express.Router();

ProductRouter.get('/', getAllProducts)
ProductRouter.get('/:id', getProductById)
ProductRouter.get('/:id/transactions', getProductTransactionHistory)
ProductRouter.get('/:id/price-adjustments', getProductPriceAdjustmentHistory)
ProductRouter.post('/create', createProduct)
ProductRouter.put('/:id/update', updateProduct)
ProductRouter.delete('/:id/delete', deleteProduct)


export default ProductRouter;