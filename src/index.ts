import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import Userrouter from './routes/userRoutes';
import ProductRouter from './routes/productRoutes';
import CustomerRouter from './routes/customerRoutes';
import OrderRouter from './routes/orderRoutes';
import SupplierRouter from './routes/suppliersRoutes';
import TransactionRouter from './routes/transactionRoutes';
import AdjustmentRouter from './routes/adjustmentsRoutes';
import ReturnRouter from './routes/returnRoutes';
import RefundRouter from './routes/refundRoutes';
import { protect } from './modules/auth';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/users", Userrouter)
app.use("/products", protect, ProductRouter)
app.use("/customers", protect, CustomerRouter)
app.use("/orders", protect, OrderRouter)
app.use("/suppliers", protect, SupplierRouter)
app.use("/transactions", protect, TransactionRouter)
app.use("/adjustments", protect, AdjustmentRouter)
app.use("/returns", protect, ReturnRouter)
app.use("/refunds", protect, RefundRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});