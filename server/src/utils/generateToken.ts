import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Types } from "mongoose";

const generateToken = async (res: Response, userId: Types.ObjectId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {
        expiresIn: "7d"
    });
    res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV === "development",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

export default generateToken;