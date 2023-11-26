import prisma from "../db";
import httpStatus from "http-status";

// Get all orders and paginate them
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
            take: req.query.take ? parseInt(req.query.take as string) : 10,
        });
        return res.json({ status: httpStatus.DONE ,orders });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Get order by id
export const getOrderById = async (req, res, next) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                OrderID: parseInt(req.params.id),
            },
        });
        return res.json({ status: httpStatus.DONE, order });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create an order
export const createOrder = async (req, res, next) => {
    try {
        const order = await prisma.order.create({
            data: {
                CustomerID: req.body.CustomerID as number,
                OrderDate: new Date(),
                TotalAmount: req.body.TotalAmount as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, order });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

// Get Order history of a customer
export const getOrderHistory = async (req, res, next) => {
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

// Get Order items of an order
export const getOrderItems = async (req, res, next) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                OrderID: parseInt(req.params.id),
            },
            include: {
                OrderItem: true,
            }
        });
        const orderItems = order.OrderItem;
        return res.json({ status: httpStatus.DONE, orderItems });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}

// Create an order for an item
export const createOrderItem = async (req, res, next) => {
    try {
        const orderItem = await prisma.orderItem.create({
            data: {
                ProductID: req.body.ProductID as number,
                OrderID: req.body.OrderID as number,
                Quantity: req.body.Quantity as number,
                UnitPrice: req.body.Price as number,
                Subtotal: req.body.Subtotal as number,
            }
        });
        return res.json({ status: httpStatus.CREATED, orderItem });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
};

//  Edit Order
export const editOrder = async (req, res, next) => {
    try {
        const order = await prisma.order.update({
            where: {
                OrderID: parseInt(req.params.id),
            },
            data: {
                CustomerID: req.body.CustomerID as number,
                OrderDate: new Date(),
                TotalAmount: req.body.TotalAmount as number,
            }
        });
        return res.json({ status: httpStatus.DONE, order });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}