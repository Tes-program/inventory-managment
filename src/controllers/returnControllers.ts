import prisma from "../db";
import httpStatus from "http-status";

// Get a list of all returns and paginate them
export const getAllReturns = async (req, res, next) => {
    try {
        const returns = await prisma.returnTransaction.findMany({
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
            take: req.query.take ? parseInt(req.query.take as string) : 10,
        });
        return res.json({ status: httpStatus.DONE ,returns });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Get return by id
export const getReturnById = async (req, res, next) => {
    try {
        const returnTransaction = await prisma.returnTransaction.findUnique({
            where: {
                ReturnID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.DONE, returnTransaction });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create a new return
export const createReturn = async (req, res, next) => {
    try {
        const returnTransaction = await prisma.returnTransaction.create({
            data: {
                OrderID: req.body.ProductID as number,
                ReturnDate: new Date(),
                Reason: req.body.ReturnReason as string,
            }
        });
        return res.json({ status: httpStatus.CREATED, returnTransaction });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};


// Edit a return
export const updateReturn = async (req, res, next) => {
    try {
        const returnTransaction = await prisma.returnTransaction.update({
            where: {
                ReturnID: parseInt(req.params.id),
            },
            data: {
                OrderID: req.body.ProductID as number,
                ReturnDate: new Date(),
                Reason: req.body.ReturnReason as string,
            }
        });
        return res.json({ status: httpStatus.CREATED, returnTransaction });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};