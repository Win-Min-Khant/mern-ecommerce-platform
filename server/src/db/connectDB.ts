import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const dbConnectString = process.env.NODE_ENV === "production" ? process.env.MONGO_URI : process.env.MONGO_LOCAL_URI;
        const res = await mongoose.connect(dbConnectString as string);
        console.log('DB connected successfully. ' + res.connection.host);
    } catch (error) {
        console.log("DB Connected Error: " + error);
        process.exit(1);
    }
}