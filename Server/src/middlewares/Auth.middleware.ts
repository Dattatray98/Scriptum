import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtPayloadWithId } from "../types/Jwt.types";

dotenv.config();

export const Auth = (req: Request, res: Response, next: NextFunction) => {
    const authheader = req.headers.authorization;

    if (!authheader) {
        return res.status(401).json({ message: "no token provided" });
    };

    const token = authheader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "invalid token formate" });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayloadWithId;
        req.user = decoded.id;
        next();
    } catch (error) {
        console.log("got some error : ", error)
    }
}
