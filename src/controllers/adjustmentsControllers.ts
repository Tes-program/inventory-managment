import prisma from "../db";
import httpStatus from "http-status";

// Get all price adjustments and paginate them

export const getAllAdjustments = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const adjustments = await prisma.priceAdjustment.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        const total = await prisma.priceAdjustment.count();
        return res.json({ adjustments, total, page, pageSize, status: httpStatus.OK });
    } catch (e) {
        console.log(e);
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
}
}

// Get all stock adjustments and paginate them
export const getStockAdjustments = async (req, res, next) => {
    try {
        const adjustments = await prisma.stockAdjustment.findMany({
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
            take: req.query.take ? parseInt(req.query.take as string) : 10,
        });
        return res.json({ status: httpStatus.OK ,adjustments });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Get price adjustment by id
export const getAdjustmentById = async (req, res, next) => {
    try {
        const adjustment = await prisma.priceAdjustment.findUnique({
            where: {
                AdjustmentID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.OK, adjustment });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create a price adjustment
export const createAdjustment = async (req, res, next) => {
    try {
        const adjustment = await prisma.priceAdjustment.create({
            data: {
                ProductID: req.body.ProductID as number,
                AdjustmentDate: new Date(),
                OldPrice: req.body.OldPrice as number,
                NewPrice: req.body.NewPrice as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, adjustment });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

// Create a stock adjustment
export const createStockAdjustment = async (req, res, next) => {
    try {
        const adjustment = await prisma.stockAdjustment.create({
            data: {
                ProductID: req.body.ProductID as number,
                AdjustmentDate: new Date(),
                OldQuantity: req.body.OldQuantity as number,
                NewQuantity: req.body.NewQuantity as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, adjustment });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

// Get stock adjustments by product id
export const getStockAdjustmentsByProductId = async (req, res, next) => {
    try {
        const adjustments = await prisma.stockAdjustment.findMany({
            where: {
                ProductID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.OK, adjustments });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}