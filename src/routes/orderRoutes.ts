import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderHistory,
  getOrderItems,
  createOrderItem,
  editOrder,
} from "../controllers/orderControllers";
import express from "express";


const OrderRouter = express.Router();

OrderRouter.get('/', getAllOrders)
OrderRouter.get('/:id', getOrderById)
OrderRouter.get('/:id/items', getOrderItems)
OrderRouter.get('/:id/history', getOrderHistory)
OrderRouter.post('/create', createOrder)
OrderRouter.post('/:id/items/create', createOrderItem)
OrderRouter.put('/:id/edit', editOrder)

export default OrderRouter;

