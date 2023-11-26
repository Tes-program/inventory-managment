import prisma from "../db";
import httpStatus from "http-status";


// Get all customers and paginate them
export const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await prisma.customer.findMany({
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
            take: req.query.take ? parseInt(req.query.take as string) : 10,
        });
        return res.json({ status: httpStatus.DONE ,customers });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Get customer by id
export const getCustomerById = async (req, res, next) => {
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                CustomerID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.DONE, customer });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create a customer
export const createCustomer = async (req, res, next) => {
    try {
        const customer = await prisma.customer.create({
            data: {
                FirstName: req.body.FirstName as string,
                LastName: req.body.LastName as string,
                ContactInfo: req.body.Phone as string,
            }
        });
        return res.json({ status: httpStatus.CREATED, customer });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

// Get Order history of a customer
export const getCustomerOrderHistory = async (req, res, next) => {
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                CustomerID: parseInt(req.params.id),
            },
            include: {
                Order: true,
            }
        });
        const orders = customer.Order;
        return res.json({ status: httpStatus.DONE, orders });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}