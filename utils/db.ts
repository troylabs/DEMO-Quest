import mongoose from "mongoose"

export const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING || "";
if (!MONGODB_URI) {
    throw new Error("DB_HOST not set");
}

let cached = (global as any).mongoose;

if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            retryWrites: false,
        };

        mongoose.set("strictQuery", true);
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}