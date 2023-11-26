import prisma from "../db";
import httpStatus from "http-status";

// Get all suppliers and paginate them
export const getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await prisma.supplier.findMany({
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
            take: req.query.take ? parseInt(req.query.take as string) : 10,
        });
        return res.json({ status: httpStatus.DONE ,suppliers });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Get supplier by id
export const getSupplierById = async (req, res, next) => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: {
                SupplierID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.DONE, supplier });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create a supplier
export const createSupplier = async (req, res, next) => {
    try {
        const supplier = await prisma.supplier.create({
            data: {
                SupplierName: req.body.SupplierName as string,
                ContactInfo: req.body.SupplierPhone as string,
            }
        });
        return res.json({ status: httpStatus.CREATED, supplier });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

// Get transactions of a supplier
export const getSupplierTransactions = async (req, res, next) => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: {
                SupplierID: parseInt(req.params.id),
            },
            include: {
                SupplierTransaction: true,
            }
        });
        const transactions = supplier.SupplierTransaction;
        return res.json({ status: httpStatus.DONE, transactions });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create a transaction for a supplier
export const createSupplierTransaction = async (req, res, next) => {
    try {
        const transaction = await prisma.supplierTransaction.create({
            data: {
                SupplierID: req.body.SupplierID as number,
                ProductID: req.body.ProductID as number,
                TransactionDate: new Date(),
                TransactionType: req.body.TransactionType,
                QuantityChange: req.body.Amount as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, transaction });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};