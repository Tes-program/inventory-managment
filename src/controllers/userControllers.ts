import prisma from "../db"
import { createJWT, hashPassword, comparePassword } from "../modules/auth"
import httpStatus from "http-status";

export const createUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data : {
                UserName: req.body.UserName as string,
                Password: (await hashPassword(req.body.Password as string)) as string,
            },
        });

        const token = createJWT(user);
        return res
        .json({ token, httpStatus: httpStatus.CREATED });

    } catch (e : any) {
        return res.json({ message: e.message, httpStatus: httpStatus.BAD_REQUEST })
    }
    }

export const loginUser = async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            UserName: req.body.UserName as string,
        },
    });

    const isValid = await comparePassword(req.body.Password, user.Password);

    if (!isValid) {
        res.status(401);
        res.json({ message: "Invalid credentials" });
        return;
    }

    const token = createJWT(user);
    res.json({ token });
};
