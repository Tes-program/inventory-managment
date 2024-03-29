import prisma from "../db";
import httpStatus from "http-status";


// Get all customers and paginate them
export const getAllCustomers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const customers = await prisma.customer.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        const total = await prisma.customer.count();
        return res.json({ customers, total, page, pageSize, status: httpStatus.OK });
    } catch (e) {
        console.log(e);
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
        return res.json({ status: httpStatus.OK, customer });
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
        return res.json({ status: httpStatus.OK, orders });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}