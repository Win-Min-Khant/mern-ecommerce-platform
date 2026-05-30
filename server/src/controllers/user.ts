import type { Request, Response } from "express";
import { User } from "../models/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import type { AuthRequest } from "../middlewares/protect.js";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import { forgetPasswordEmailTemplate } from "../utils/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// @route POST | api/register
// @desc Register new user
// @access Public
export const registerUser = asyncHandler(async (req:Request, res:Response) => {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists.");
    }
    const newUser = await User.create({
        username,
        email,
        password,
        role
    });

    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
    });
});

// @route POST | api/login
// @desc Login to existing user's account
// @access Public
export const loginUser = asyncHandler(async (req:Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser && await existingUser.isMatchPsw(password)) {
        // token
        await generateToken(res, existingUser._id);
        res.status(200).json({
            _id: existingUser._id
        })
    } else {
        res.status(401).json({message: "User not found with these credentials!"});
    }
})

// @route POST | api/logout
// @desc Logout from account
// @access Public
export const logoutUser = asyncHandler(async (req:Request, res:Response) => {
    res.clearCookie("token", {
        httpOnly: process.env.NODE_ENV === "development",
        expires: new Date(0)
    })
    res.status(200).json({message: "Logout successfully!"})
})

// @route POST | api/upload
// @desc upload or update user's avatar
// @access Private
export const uploadAvatar = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { image_url } = req.body;
    const userDoc = await User.findById(user?._id);
    if (userDoc?.avatar.image_url) {
        await deleteImage(userDoc.avatar.public_alt);
    }

    const response = await uploadSingleImage(image_url, "clothing-ecommerce/avatar");
    await User.findByIdAndUpdate(user?._id, {
        avatar: {
            image_url: response.image_url,
            public_alt: response.public_alt
        }
    });
    res.status(200).json({message: "Avatar is uploaded successfully!"});
})

// @route PUT | api/update-email
// @desc update user's email
// @access Private
export const updateUserEmail = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { email } = req.body;
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
        throw new Error("User already exists with this email address.");
    } 

    await User.findByIdAndUpdate(user?._id, { email });
    res.status(200).json({ message: "Email is updated successfully." });
})


// @route GET | api/profile
// @desc get user's information
// @access Private
export const getUserInfo = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const userDoc = await User.findById(user?._id).select("-password");
    res.status(200).json(userDoc);
})

// @route POST | api/update-username
// @desc get user's username
// @access Private
export const updateUsername = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { username } = req.body;
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        throw new Error("Username already exists with this one!");
    }
    await User.findByIdAndUpdate(user?._id, { username });
    res.status(200).json({ message: "Username is updated successfully." });
})

// @route POST | api/update-password
// @desc get user's password
// @access Private
export const updatePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;
    const existingUser = await User.findById(user?._id).select("+password");
    if (!existingUser) {
        throw new Error("Something went wrong!");
    }
    const isPasswordMatch = await bcrypt.compare(currentPassword, existingUser.password);
    if (!isPasswordMatch) {
        res.status(401);
        throw new Error("Password doesn't match.");
    }
    existingUser.password = newPassword;
    await existingUser.save();
    res.status(200).json({ message: "Password is updated successfully!"});
});

// @route POST | api/forgot-password
// @desc send email to user's own email
// @access Public
// export const sendForgotPswEmail = asyncHandler(async (req: Request, res: Response) => {
//     const { email } = req.body;

//     // ၁။ User ရှိမရှိ စစ်မယ်
//     const user = await User.findOne({ email });

//     if (!user) {
//         res.status(404);
//         throw new Error("There is no user with that email address.");
//     }

//     // ၂။ Token ထုတ်မယ် (Model ထဲမှာ ရေးထားတဲ့ method ကို ခေါ်သုံးတာ)
//     const resetToken = user.generatePswResetToken();

//     // ၃။ Database မှာ Token နဲ့ Expiry ကို Save မယ်
//     // validation တွေ ကျော်ဖို့ validateBeforeSave: false ထည့်ပေးရပါမယ်
//     await user.save({ validateBeforeSave: false });

//     // ၄။ Reset URL ဖန်တီးမယ်
//     // Frontend URL ကို .env ထဲကယူတာ ပိုကောင်းပါတယ်
//     const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//     // ၅။ Email ပို့မယ်
//     try {
//         await sendEmail({
//             email: user.email,
//             subject: "Password Reset Request",
//             html: forgetPasswordEmailTemplate(resetUrl),
//         });

//         res.status(200).json({
//             success: true,
//             message: `Email sent to: ${user.email}`,
//         });
//     } catch (error) {
//         // Email ပို့တာ အဆင်မပြေရင် DB ထဲက Token တွေကို ပြန်ဖျက်ပေးရမယ်
//         user.resetPswToken = undefined;
//         user.resetPswExpire = undefined;
//         await user.save({ validateBeforeSave: false });

//         res.status(500);
//         throw new Error("Email could not be sent. Please try again later.");
//     }
// });

// @route POST | api/forgot-password
// @desc send email to user's own email
// @access Public
export const sendForgotPswEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        res.status(404);
        throw new Error("User not found!");
    }
    const resetToken = await existingUser.generatePswResetToken();
    await existingUser.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    try {
        await sendEmail({
            email: existingUser.email,
            subject: "Password Reset Request",
            html: forgetPasswordEmailTemplate(resetUrl)
        });
        res.status(200).json({
            message: `Email sent to: ${existingUser.email}`,
        });
    } catch (error) {
        existingUser.resetPswToken = undefined;
        existingUser.resetPswToken = undefined;
        await existingUser.save();
        res.status(500);
        throw new Error("Email could not be sent. Please try again later.");
    }
})

// @route POST | api/reset-password/:token
// @desc reset user's password using a new one
// @access Private
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token as string).digest("hex");
    const query: any = {
        resetPswToken: hashedToken,
        resetPswExpire: { $gt: Date.now() },
    };
    const user = await User.findOne(query);
    if (!user) {
        throw new Error("Invalid Token, Send Email Request Again!");
    }
    user.password = newPassword;
    user.resetPswExpire = undefined;
    user.resetPswToken = undefined;
    await user.save();
    res.status(200).json({ message: "Password is reset successfully!" });
})