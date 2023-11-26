import prisma from "../db";
import httpStatus from "http-status";

// Get all refunds and paginate them
export const getAllRefunds = async (req, res, next) => {
    try {
        const refunds = await prisma.refundTransaction.findMany({
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
            take: req.query.take ? parseInt(req.query.take as string) : 10,
        });
        return res.json({ status: httpStatus.DONE ,refunds });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Get refund by id
export const getRefundById = async (req, res, next) => {
    try {
        const refund = await prisma.refundTransaction.findUnique({
            where: {
                RefundID: parseInt(req.params.id)
            }
        });
        return res.json({ status: httpStatus.DONE ,refund });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create a refund
export const createRefund = async (req, res, next) => {
    try {
        const refund = await prisma.refundTransaction.create({
            data: {
                ReturnID: req.body.ReturnID as number,
                RefundDate: new Date(),
                RefundAmount: req.body.RefundAmount as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, refund });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

// Edit a refund
export const updateRefund = async (req, res, next) => {
    try {
        const refund = await prisma.refundTransaction.update({
            where: {
                RefundID: parseInt(req.params.id),
            },
            data: {
                ReturnID: req.body.ReturnID as number,
                RefundDate: new Date(),
                RefundAmount: req.body.RefundAmount as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, refund });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

