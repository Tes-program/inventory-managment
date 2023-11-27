import prisma from "../db";
import httpStatus from "http-status";

// Get all refunds and paginate them
export const getAllRefunds = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const refunds = await prisma.refundTransaction.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        const total = await prisma.refundTransaction.count();
        return res.json({ refunds, total, page, pageSize, status: httpStatus.OK });
    } catch (e) {
        console.log(e);
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
        return res.json({ status: httpStatus.OK ,refund });
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

