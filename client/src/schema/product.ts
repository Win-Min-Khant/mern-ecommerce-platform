import { z } from "zod";

const IMAGES_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createProductSchema = z.object({
  name: z
    .string("Product name must be a string.")
    .trim()
    .min(3, "Product name must be at least 3 characters long."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long."),

  price: z.number().positive("Price must be a positive number."),

  instock_count: z
    .number()
    .int("In-stock count must be a whole number.")
    .nonnegative("In-stock count cannot be negative."),

  category: z.string(),

  size: z
    .array(z.enum(["S", "M", "L", "XL"]))
    .min(1, "At least one size must be selected."),

  color: z
    .array(z.string().trim())
    .min(1, "At least one color must be selected."),

  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        preview: z.string(),
        public_alt: z.string().trim().optional(),
      }),
    )
    .min(1, "At least one product image is required."),

  is_new_arrival: z.boolean(),

  is_feature: z.boolean(),

  rating_count: z.number().int().nonnegative(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
