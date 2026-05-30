import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.js";
import type { Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

interface User {
    _id: string | Types.ObjectId;
    username: string;
    email: string;
    role: "customer" | "admin";
}

export interface AuthRequest extends Request {
    user?: User;
}

// @desc Middleware to protect routes and check if user is authenticated
export const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401);
        throw new Error("Not authorized.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded) {
            res.status(401);
            throw new Error("Not authorized. Invalid token.");
        }
        req.user = await User.findById(decoded.userId).select("-password") as User;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized. Invalid token.");
    }
});

// @desc Middleware to check if user is admin
export const isAdmin = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
        res.status(401);
        throw new Error("You have no permission to make this action.");
    }
    next();
})