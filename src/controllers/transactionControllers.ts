import prisma from "../db";
import httpStatus from "http-status";


// Get all transactions and paginate them
export const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await prisma.inventoryTransaction.findMany({
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
            take: req.query.take ? parseInt(req.query.take as string) : 10,
        });
        return res.json({ status: httpStatus.DONE ,transactions });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Get transaction by id
export const getTransactionById = async (req, res, next) => {
    try {
        const transaction = await prisma.inventoryTransaction.findUnique({
            where: {
                TransactionID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.DONE, transaction });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create a transaction for a product
export const createTransaction = async (req, res, next) => {
    try {
        const transaction = await prisma.inventoryTransaction.create({
            data: {
                ProductID: req.body.ProductID as number,
                TransactionDate: new Date(),
                TransactionType: req.body.TransactionType,
                QuantityChange: req.body.Quantity as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, transaction });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};





