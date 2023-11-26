import {
  getRefundById,
  getAllRefunds,
  createRefund,
  updateRefund,
} from "../controllers/refundControllers";
import express from "express";

const RefundRouter = express.Router();

RefundRouter.get("/", getAllRefunds);
RefundRouter.get("/:id", getRefundById);
RefundRouter.post("/create", createRefund);
RefundRouter.put("/:id/update", updateRefund);

export default RefundRouter;
