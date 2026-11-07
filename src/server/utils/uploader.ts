import { InternalServerError } from "./errors";
import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinaryConfig";

const uploadImage = async (imagePath: string) => {
    // Use the CLOUDINARY_* variables when they are set (otherwise the SDK
    // falls back to CLOUDINARY_URL).
    if (process.env.CLOUDINARY_CLOUD_NAME) cloudinaryConfig();

    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            unique_filename: true,
            overwrite: true,
            use_filename: true,
        });
        return result.url;
    } catch (err: any) {
        console.error("File upload error:", err);
        throw new InternalServerError(err.message);
    }
};

export default uploadImage;
