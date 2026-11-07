import { CustomError } from "./errors";
import type { ApiResponse } from "../lib/express";

export const logData = (res: ApiResponse, status: number, data: any) => {
    res.status(status).json(data);
};

export const logError = (res: ApiResponse, error: CustomError) => {
    res.status(error.status).json({ ...error, message: error.message });
};
