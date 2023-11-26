import {
  getReturnById,
  getAllReturns,
  createReturn,
  updateReturn,
} from "../controllers/returnControllers";
import express from "express";

const ReturnRouter = express.Router();

ReturnRouter.get("/", getAllReturns);
ReturnRouter.get("/:id", getReturnById);
ReturnRouter.post("/create", createReturn);
ReturnRouter.put("/:id/update", updateReturn);

export default ReturnRouter;