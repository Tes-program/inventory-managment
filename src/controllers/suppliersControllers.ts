import prisma from "../db";
import httpStatus from "http-status";

// Get all suppliers and paginate them
export const getAllSuppliers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const suppliers = await prisma.supplier.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        const total = await prisma.supplier.count();
        return res.json({ suppliers, total, page, pageSize, status: httpStatus.OK });
    } catch (e) {
        console.log(e);
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
        return res.json({ status: httpStatus.OK, supplier });
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
        return res.json({ status: httpStatus.OK, transactions });
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