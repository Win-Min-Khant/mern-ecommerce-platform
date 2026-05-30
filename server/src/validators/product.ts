import { body } from "express-validator";

export const productRules = [
    // String fields
    body("name")
        .trim()
        .notEmpty().withMessage("Product name is required.")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long."),

    body("description")
        .trim()
        .notEmpty().withMessage("Description is required.")
        .isLength({ min: 10 }).withMessage("Description should be more detailed."),

    body("category")
        .trim()
        .notEmpty().withMessage("Category is required."),

    // Number fields
    body("price")
        .isNumeric().withMessage("Price must be a number.")
        .custom((value) => value > 0).withMessage("Price must be greater than 0."),

    body("instock_count")
        .isInt({ min: 0 }).withMessage("Stock count cannot be negative."),

    body("rating_count")
        .isInt({ min: 0 }).withMessage("Rating count must be a number."),

    // Array of strings (Size & Color)
    body("size")
        .isArray({ min: 1 }).withMessage("At least one size must be provided."),
    
    body("color")
        .isArray({ min: 1 }).withMessage("At least one color must be provided."),

    // Boolean fields
    body("is_new_arrival")
        .isBoolean().withMessage("is_new_arrival must be a boolean value."),

    body("is_feature")
        .isBoolean().withMessage("is_feature must be a boolean value."),

    // Nested Objects Array (Images)
    body("images")
        .isArray({ min: 1 }).withMessage("At least one image is required."),
    body("images.*.url")
        .isURL().withMessage("Each image must have a valid URL."),
    body("images.*.public_alt")
        .notEmpty().withMessage("Image alt text is required.")
];