import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB Connected Successfully: ${connection.connection.host}`);
        return connection; // Return the connection object
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure code
    }
};
