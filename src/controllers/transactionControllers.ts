import prisma from "../db";
import httpStatus from "http-status";


// Get all transactions and paginate them
export const getAllTransactions = async (req, res, next) => {
   try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const transaction = await prisma.inventoryTransaction.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
   });
    const total = await prisma.inventoryTransaction.count();
    return res.json({transaction, total, page, pageSize, status: httpStatus.OK});
} catch (e) {
    console.log(e);
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
        return res.json({ status: httpStatus.OK, transaction });
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





