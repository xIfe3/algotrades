import withdrawalModel from "../models/withdrawal.model";
import { emailService } from "../utils/emailService";
import { logError, logData } from "../utils/logger";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "../utils/Types";
import { NotFoundError } from "../utils/errors";
import { getUserById } from "../services/user.service";
import walletModel from "../models/wallet.model";

export const fetchAllWithdrawals = asyncHandler(
    async (req: Request, res: Response) => {
        const withdrawals = await withdrawalModel.find().populate("user");

        return logData(res, 200, { withdrawals });
    }
);

export const fetchAllPendingWithdrawals = asyncHandler(
    async (req: Request, res: Response) => {
        const withdrawals = await withdrawalModel
            .find({ status: "pending" })
            .populate("user");

        return logData(res, 200, { withdrawals });
    }
);

export const fetchAllApprovedWithdrawals = asyncHandler(
    async (req: Request, res: Response) => {
        const withdrawals = await withdrawalModel
            .find({ status: "approved" })
            .populate("user");

        return logData(res, 200, { withdrawals });
    }
);

export const fetchAllRejectedWithdrawals = asyncHandler(
    async (req: Request, res: Response) => {
        const withdrawals = await withdrawalModel
            .find({ status: "rejected" })
            .populate("user");

        return logData(res, 200, { withdrawals });
    }
);

export const getTotalWithdrawal = asyncHandler(
    async (req: Request, res: Response) => {
        const withdrawals = await withdrawalModel.find({ status: "approved" });

        let totalAmount = 0;
        withdrawals.forEach((withdrawal) => {
            totalAmount += withdrawal.amount;
        });

        return logData(res, 200, { totalAmount });
    }
);

export const handleWithdrawal = asyncHandler(
    async (req: Request, res: Response) => {
        const status = req.params.status;
        const withdrawalId = req.params.withdrawalId;

        const withdrawal = await withdrawalModel.findByIdAndUpdate(
            withdrawalId,
            { $set: { status } },
            { new: status }
        );
        if (!withdrawal)
            return logError(res, new NotFoundError("Withdrawal not found"));

        const userWallet = await walletModel.findOne({
            "user.userId": withdrawal?.user,
        });

        if (!userWallet)
            return logError(res, new NotFoundError("User wallet not found"));

        if (status === "rejected") {
            userWallet.balance += withdrawal.amount;
            await userWallet.save();
        }

        const user = await getUserById(withdrawal?.user);

        // send mail to the user and admin
        emailService.sendWithdrawalStatusUpdate(
            user,
            withdrawal.amount,
            status
        );

        return logData(res, 200, {
            message: `Withdrawal ${status} successfully`,
            withdrawal,
        });
    }
);
