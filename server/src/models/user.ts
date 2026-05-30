import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import crypto from "crypto";

interface Image {
    image_url: string;
    public_alt: string
}

interface IUser {
    username: string;
    email: string;
    password: string;
    avatar: Image;
    role: 'customer' | 'admin',
    resetPswToken: string | undefined;
    resetPswExpire: string | undefined;
    isMatchPsw: (enterPsw: string) => boolean
    generatePswResetToken: () => string
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: {
            image_url: String,
            public_alt: String
        }
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    resetPswToken: String,
    resetPswExpire: String
}, { timestamps: true });

// Hash Password Before Save
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// For Login Password Check
userSchema.methods.isMatchPsw = async function (enterPsw: string) {
    return await bcrypt.compare(enterPsw, this.password);
}

// For ForgotPassword Email
userSchema.methods.generatePswResetToken = function (): string {
    const token = crypto.randomBytes(20).toString("hex");
    this.resetPswToken = crypto.createHash("sha256").update(token).digest("hex");
    this.resetPswExpire = Date.now() + (10 * 60 * 1000);
    return token;
}

export const User = mongoose.model<IUser>("User", userSchema);