import insertPlans from "../middlewares/insertPlans";
import mongoose from "mongoose";

export const getDbUri = () =>
    (process.env.NODE_ENV === "production"
        ? process.env.CLOUD_DB_URI
        : process.env.LOCAL_DB_URI) || "";

type Cache = { promise: Promise<typeof mongoose> | null };

// Cache the connection across hot reloads / route invocations.
const globalForMongo = globalThis as unknown as { __mongoose?: Cache };
const cache: Cache = globalForMongo.__mongoose || { promise: null };
globalForMongo.__mongoose = cache;

const dbConn = async () => {
    if (mongoose.connection.readyState === 1) return mongoose;

    if (!cache.promise) {
        const CONN_STR = getDbUri();
        if (!CONN_STR) {
            throw new Error(
                "Database URI is not set (LOCAL_DB_URI in development, CLOUD_DB_URI in production)"
            );
        }
        cache.promise = mongoose
            .connect(CONN_STR)
            .then((m) => {
                console.log("MongoDB Connected");
                insertPlans();
                return m;
            })
            .catch((error) => {
                cache.promise = null;
                throw error;
            });
    }

    return cache.promise;
};

export default dbConn;
