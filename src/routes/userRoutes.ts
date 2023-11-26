import { createUser, loginUser } from "../controllers/userControllers";
import { protect } from "../modules/auth";
import express from "express";

const Userrouter = express.Router();

Userrouter.post('/sign-up', createUser)
Userrouter.post('/login', loginUser)

export default Userrouter;