import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getNewProducts, getProductById, getProductsByFilter, getProductsMeta, updateProduct } from "../controllers/product.js";
import { isAdmin, protect } from "../middlewares/protect.js";
import { productRules } from "../validators/product.js";
import { validateError } from "../middlewares/validateError.js";

const router = Router();
router.post("/products", protect, isAdmin, productRules, validateError, createProduct);
// router.get("/products/", protect, isAdmin, getAllProducts);
router.put("/products/:id", protect, isAdmin, updateProduct);
router.delete("/products/:id", protect, isAdmin, deleteProduct);
router.get("/products", getProductsByFilter);
router.get("/products/new", getNewProducts);
router.get("/products/featured", getFeaturedProducts);
router.get("/products/:id", getProductById);
router.get("/products/filter/meta", getProductsMeta);
export default router;