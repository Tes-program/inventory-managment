import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  getCustomerOrderHistory,
} from "../controllers/customerControllers";
import express from "express";
import { handleInputError } from "../modules/middleware";

const CustomerRouter = express.Router();

CustomerRouter.get('/', getAllCustomers)
CustomerRouter.get('/:id', getCustomerById)
CustomerRouter.get('/:id/orders', getCustomerOrderHistory)
CustomerRouter.post('/create', createCustomer)

export default CustomerRouter;
