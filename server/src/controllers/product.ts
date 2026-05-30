import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.js";
import type { AuthRequest } from "../middlewares/protect.js";
import { User } from "../models/user.js";

// @route GET | api/products
// @desc Fetch all products
// @access Private
export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find();
    if (!products) {
        res.status(404);
        throw new Error("Products are not found.");
    }
    res.status(200).json(products);
});

// @route POST | api/products
// @desc Create new product
// @access Private
export const createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
        name,
        description,
        price,
        instock_count,
        category,
        size,
        color,
        images,
        is_new_arrival,
        is_feature,
        rating_count
    } = req.body;
    const newProduct = await Product.create({
        name,
        description,
        price,
        instock_count,
        category,
        size,
        color,
        images,
        is_new_arrival,
        is_feature,
        rating_count,
        userId: req.user?._id
    });
    if (newProduct) {
        res.status(201).json(newProduct);
    } else {
        throw new Error("Failed to create new product.")
    }
});

// @route PUT | api/products
// @desc Update to an existing product
// @access Private
export const updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const {
        name,
        description,
        price,
        instock_count,
        category,
        size,
        color,
        images,
        is_new_arrival,
        is_feature,
        rating_count
    } = req.body;
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
        res.status(404);
        throw new Error("Product is not found.");
    }
    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.instock_count = instock_count || existingProduct.instock_count;
    existingProduct.category = category || existingProduct.category;
    existingProduct.size = size || existingProduct.size;
    existingProduct.color = color || existingProduct.color;
    existingProduct.images = images || existingProduct.images;
    existingProduct.is_new_arrival = is_new_arrival || existingProduct.is_new_arrival;
    existingProduct.is_feature = is_feature || existingProduct.is_feature;
    existingProduct.rating_count = rating_count || existingProduct.rating_count;

    const updatedProduct = await existingProduct.save();
    res.status(200).json(updatedProduct);
});

// @route DELETE | api/products
// @desc Delete to an existing product
// @access Private
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
        res.status(404);
        throw new Error("Product is not found.");
    }
    await existingProduct.deleteOne();
    res.status(200).json({message: "Product is deleted successfully."});
})


// @route GET | api/products
// @desc Get all products by filter (Combine getAllProducts with filters to keep it DRY)
// @access Public
export const getProductsByFilter = asyncHandler(async (req: Request, res: Response) => {
    const { keyword, category, minPrice, maxPrice, size, color, sortBy } = req.query;
    let query: any = {};

    // 1. Keyword Search (Safe regex)
    if (keyword) {
        query.name = { $regex: String(keyword).trim(), $options: "i" };
    }

    // 2. Category Filter
    if (category) {
        query.category = category;
    }

    // 3. Price Range Filter (With Safe Number Parsing)
    if (minPrice || maxPrice) {
        query.price = {};
        const parsedMin = Number(minPrice);
        const parsedMax = Number(maxPrice);
        
        if (!isNaN(parsedMin)) query.price.$gte = parsedMin;
        if (!isNaN(parsedMax)) query.price.$lte = parsedMax;
    }

    // 4. Array Filters (Sizes & Colors) - Proper MongoDB Array Matching
    if (size) {
        const sizeArray = size.toString().split(',');
        query.size = { $in: sizeArray }; // Product ရဲ့ size array ထဲမှာ frontend က ရွေးထားတဲ့ size ပါရင် ယူမယ်
    }
    
    if (color) {
        const colorArray = color.toString().split(',');
        query.color = { $in: colorArray };
    }

    // 5. Sorting Options
    let sortOption: any = {};
    if (sortBy === "price_asc") sortOption.price = 1;
    else if (sortBy === "price_desc") sortOption.price = -1;
    else if (sortBy === "latest") sortOption.createdAt = -1;
    else if (sortBy === "rating") sortOption.rating_count = -1;
    else sortOption.createdAt = -1; // Default sorting

    const products = await Product.find(query).sort(sortOption);
    res.status(200).json(products);
});

// @route DELETE | api/products/new
// @desc Get new products by sorting
// @access Public
export const getNewProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({ is_new_arrival: true }).sort({ createdAt: -1 });
    res.status(200).json(products);
})

// @route DELETE | api/products/featured
// @desc Get featured products
// @access Public
export const getFeaturedProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({ is_feature: true });
    res.status(200).json(products);
})

// @route DELETE | api/products/:id
// @desc Get each product's detail
// @access Public
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        res.status(404).json({ message: "Product Not Found!" });
    }
    res.status(200).json(product);
})

export const getProductsMeta = asyncHandler(async (req: Request, res: Response) => {
    const colors = await Product.distinct("color");
    const sizes = await Product.distinct("size");
    const priceRange = await Product.aggregate([
        {
            $group: {
                _id: null,
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" }
            }
        }
    ]);
    res.status(200).json({
        colors,
        sizes,
        minPrice: priceRange[0].minPrice || 0,
        maxPrice: priceRange[0].maxPrice || 0
    })
})

