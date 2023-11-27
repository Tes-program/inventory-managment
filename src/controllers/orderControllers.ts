import prisma from "../db";
import httpStatus from "http-status";

// Get all orders and paginate them
export const getAllOrders = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const orders = await prisma.order.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        const total = await prisma.order.count();
        return res.json({ orders, total, page, pageSize, status: httpStatus.OK });
    } catch (e) {
        console.log(e);
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
        return res.json({ status: httpStatus.OK, order });
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
        return res.json({ status: httpStatus.OK, orders });
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
        return res.json({ status: httpStatus.OK, orderItems });
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
        return res.json({ status: httpStatus.OK, order });
    } catch (e) {
        return res.json({ message: e.message, status: httpStatus.BAD_REQUEST });
    }
}