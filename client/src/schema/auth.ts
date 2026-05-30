import { z } from "zod";

// မင်းဆီမှာ ရှိပြီးသား Validation တွေ
const emailValidation = z.string().email("Invalid email address.");
const passwordValidation = z.string().min(5, "Password too short.");

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, "Username is required.")
        .min(3, "Username must be at least 3 characters."),
    email: emailValidation,
    password: passwordValidation
});

export const loginSchema = z.object({
    email: emailValidation,
    password: passwordValidation
});

// Update Schema: Register Schema ကို အခြေခံပြီး Field အကုန်လုံးကို Optional လုပ်မယ်
// .extend() သုံးပြီး profile field ကို အသစ်ထည့်မယ်
// auth.ts ထဲက updateSchema ကို ဒီလို ပြင်လိုက်ပါ
export const updateSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    // password ကို ၅ လုံးထက်များရမယ် (သို့) အလွတ်ဖြစ်ရမယ် လို့ စစ်တာပါ
    password: z.string()
        .min(5, "Password too short.")
        .or(z.literal("")), 
    image_url: z.string().optional()
}).partial();

// partial() က username, email, password နဲ့ profile အကုန်လုံးကို optional ဖြစ်စေပါတယ်

// updatedEmailSchema
export const updatedEmailSchema = z.object({
    email: emailValidation
});

// updatedUsernameSchema
export const updatedUsernameSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters."),
});

// updatedPasswordSchema
export const updatedPasswordSchema = z.object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    confirmPassword: z.string().min(1, "Please enter new password again!")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"] 
});

// forgotPasswordSchema
export const forgotPasswordSchema = z.object({
    email: emailValidation
});

// resetPasswordSchema
export const resetPasswordSchema = z.object({
    newPassword: passwordValidation,
    confirmPassword: z.string().min(1, "Please enter new password again!")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password dont't match!",
    path: ["confirmPassword"]
})