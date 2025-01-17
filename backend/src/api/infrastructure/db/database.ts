import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/cleanarch", {
        });
        console.log("Database connected!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};
