import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import errorHandler from "./middlewares/errorHandler.js";

// dotenv config
dotenv.config({
    path: ".env"
});

// create server
const app = express();

// middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(json());
app.use(cookieParser());

// routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);

// custom middlewares
app.use(errorHandler);

// connect with db and server
const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on PORT ${PORT}.`);
})