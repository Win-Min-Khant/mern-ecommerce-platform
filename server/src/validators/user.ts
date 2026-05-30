import { body, param } from "express-validator";

export const registerRules = [
    // String fields
    body("username")

        .trim()
        .notEmpty().withMessage("Username is required.")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long."),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please enter valid email format only!"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long."),
];

export const loginRules = [
    // String fields

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please enter valid email format only!"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long."),
];

export const uploadImageValidator = [
    body('image_url')
        .optional({ checkFalsy: true })
        .isString() // string အလွတ်ဖြစ်နေရင် validation ကို ကျော်သွားပေးမယ်
        .withMessage('Invalid image link')
];

export const updatedEmailValidator = [
    body("email")
        .trim()
        .isEmail().withMessage("Please enter valid email format only!"),
];

export const updatedUsernameValidator = [
    body("username")
        .trim()
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long.")
];

export const updatedPasswordValidator = [
    body("currentPassword")
        .trim()
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long."),
    body("newPassword")
        .trim()
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long.")
];

export const forgotPasswordValidator = [
    body("newPassword")
        .trim()
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long.")
]

export const resetPasswordValidator = [
    param("token").notEmpty().withMessage("Token is required."),
    body("newPassword")
        .trim()
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long.")
]