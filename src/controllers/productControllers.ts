import prisma from "../db";
import httpStatus from "http-status";

// Get all products and paginate them

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
            take: req.query.take ? parseInt(req.query.take as string) : 10,
        });
        return res.json({ status: httpStatus.OK ,products });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}
// Get product by id
export const getProductById = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                ProductID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.OK, product });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create a product
export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                Name: req.body.Name as string,
                Description: req.body.Description as string,
                Price: req.body.Price as number,
                ExpirationDate: req.body.ExpirationDate as Date,
                ShelfLife: req.body.ShelfLife as number,
                StockQuantity: req.body.StockQuantity as number,
                SupplierID: req.body.SupplierID as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, product });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

// Get transaction history of a product

export const getProductTransactionHistory = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                ProductID: parseInt(req.params.id),
            },
            include: {
                InventoryTransaction: true,
            },
        });
        const transactions = product.InventoryTransaction;
        return res.json({ status: httpStatus.OK, transactions });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Get price adjustment history of a product

export const getProductPriceAdjustmentHistory = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                ProductID: parseInt(req.params.id),
            },
            include: {
                PriceAdjustment: true,
            },
        });
        const priceAdjustments = product.PriceAdjustment;
        return res.json({ status: httpStatus.OK, priceAdjustments });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Update a product

export const updateProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.update({
            where: {
                ProductID: parseInt(req.params.id),
            },
            data: {
                Name: req.body.Name as string,
                Description: req.body.Description as string,
                Price: req.body.Price as number,
                ExpirationDate: req.body.ExpirationDate as Date,
                ShelfLife: req.body.ShelfLife as number,
                StockQuantity: req.body.StockQuantity as number,
                SupplierID: req.body.SupplierID as number,
            },
        });
        return res.json({ status: httpStatus.OK, product });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Delete a product
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.delete({
            where: {
                ProductID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.OK, product });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}