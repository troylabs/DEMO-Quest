import mongoose from "mongoose"

export const dbConnect = async () => {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    if (!connectionString) {
        throw new Error("MONGODB_CONNECTION_STRING is not defined");
    }

    const conn = await mongoose.connect(connectionString);
    return conn;
}