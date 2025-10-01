import { Request, Response } from "express";
import investmentModel from "../models/investment.model";
import userModel from "../models/user.model";
import walletModel from "../models/wallet.model";
import asyncHandler from "express-async-handler";
import { NotFoundError, BadRequestError } from "../utils/errors";
import mongoose from "mongoose";

// List all investments (with optional filtering)
export const getAllInvestments = asyncHandler(
    async (req: Request, res: Response) => {
        const { status, user } = req.query;
        const filter: any = {};

        if (status) filter.status = status;
        if (user) filter.user = new mongoose.Types.ObjectId(user as string);

        const investments = await investmentModel
            .find(filter)
            .populate("user", "fullName email username") // Populate user details if needed
            .populate("plan.planId", "name duration initialInvestment"); // Populate plan details

        res.status(200).json({ success: true, investments });
    }
);

// Get a specific investment by ID
export const getInvestmentById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const investment = await investmentModel
            .findById(id)
            .populate("user", "fullName email username")
            .populate("plan.planId", "name duration initialInvestment");

        if (!investment) {
            throw new NotFoundError("Investment not found");
        }

        res.status(200).json({ success: true, investment });
    }
);

// Pause an investment
export const pauseInvestment = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { adminNotes } = req.body;

        const investment = await investmentModel.findById(id);
        if (!investment) {
            throw new NotFoundError("Investment not found");
        }

        if (investment.status !== "active") {
            throw new BadRequestError("Only active investments can be paused");
        }

        investment.status = "paused";
        investment.pausedAt = new Date();
        if (adminNotes) {
            investment.adminNotes = adminNotes;
        }

        await investment.save();

        res.status(200).json({
            success: true,
            message: "Investment paused successfully",
            investment,
        });
    }
);

// Resume an investment
export const resumeInvestment = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { adminNotes } = req.body;

        const investment = await investmentModel.findById(id);
        if (!investment) {
            throw new NotFoundError("Investment not found");
        }

        if (investment.status !== "paused") {
            throw new BadRequestError("Only paused investments can be resumed");
        }

        investment.status = "active";
        investment.resumedAt = new Date();
        if (adminNotes) {
            investment.adminNotes = adminNotes;
        }

        await investment.save();

        res.status(200).json({
            success: true,
            message: "Investment resumed successfully",
            investment,
        });
    }
);

// Terminate an investment
export const terminateInvestment = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { adminNotes, returnPrincipal = false } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const investment = await investmentModel
                .findById(id)
                .session(session);
            if (!investment) {
                throw new NotFoundError("Investment not found");
            }

            if (
                investment.status === "completed" ||
                investment.status === "terminated"
            ) {
                throw new BadRequestError(
                    "Investment is already completed or terminated"
                );
            }

            // Update investment status
            investment.status = "terminated";
            investment.terminatedAt = new Date();
            if (adminNotes) {
                investment.adminNotes = adminNotes;
            }

            await investment.save({ session });

            // If returning principal, add it to user's wallet
            if (returnPrincipal) {
                const wallet = await walletModel
                    .findOne({
                        "user.userId": investment.user,
                    })
                    .session(session);

                if (wallet) {
                    wallet.balance += investment.amount;
                    await wallet.save({ session });
                }
            }

            await session.commitTransaction();

            res.status(200).json({
                success: true,
                message: `Investment terminated successfully${
                    returnPrincipal ? " and principal returned to wallet" : ""
                }`,
                investment,
            });
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
);

// Complete an investment manually
export const completeInvestment = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { adminNotes, addFinalProfit = 0 } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const investment = await investmentModel
                .findById(id)
                .session(session);
            if (!investment) {
                throw new NotFoundError("Investment not found");
            }

            if (
                investment.status === "completed" ||
                investment.status === "terminated"
            ) {
                throw new BadRequestError(
                    "Investment is already completed or terminated"
                );
            }

            // Update investment status
            investment.status = "completed";
            investment.profitAccumulated += addFinalProfit;
            if (adminNotes) {
                investment.adminNotes = adminNotes;
            }

            await investment.save({ session });

            // Return principal and profit to user's wallet
            const wallet = await walletModel
                .findOne({
                    "user.userId": investment.user,
                })
                .session(session);

            if (wallet) {
                wallet.balance += investment.amount; // Return principal
                wallet.profit += investment.profitAccumulated; // Add accumulated profit
                await wallet.save({ session });
            }

            await session.commitTransaction();

            res.status(200).json({
                success: true,
                message:
                    "Investment completed successfully and funds added to wallet",
                investment,
            });
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
);

// Update investment profit manually
export const updateInvestmentProfit = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { profitAmount, adminNotes } = req.body;

        if (!profitAmount || profitAmount < 0) {
            throw new BadRequestError("Valid profit amount is required");
        }

        const investment = await investmentModel.findById(id);
        if (!investment) {
            throw new NotFoundError("Investment not found");
        }

        investment.profitAccumulated += profitAmount;
        if (adminNotes) {
            investment.adminNotes = adminNotes;
        }

        await investment.save();

        res.status(200).json({
            success: true,
            message: "Investment profit updated successfully",
            investment,
        });
    }
);

// Update user wallet balance
export const updateUserWallet = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { balanceAmount, profitAmount, referralBonusAmount, adminNotes } =
            req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const wallet = await walletModel.findOne({
            "user.userId": userId,
        });

        if (!wallet) {
            throw new NotFoundError("User wallet not found");
        }

        // Update wallet amounts
        if (balanceAmount !== undefined) {
            wallet.balance += balanceAmount;
        }
        if (profitAmount !== undefined) {
            wallet.profit += profitAmount;
        }
        if (referralBonusAmount !== undefined) {
            wallet.referralBonus += referralBonusAmount;
        }

        await wallet.save();

        res.status(200).json({
            success: true,
            message: "User wallet updated successfully",
            wallet,
        });
    }
);

// Get investment statistics
export const getInvestmentStats = asyncHandler(
    async (req: Request, res: Response) => {
        const stats = await investmentModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$amount" },
                    totalProfit: { $sum: "$profitAccumulated" },
                },
            },
        ]);

        const totalInvestments = await investmentModel.countDocuments();
        const totalInvestmentAmount = await investmentModel.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        res.status(200).json({
            success: true,
            stats: {
                byStatus: stats,
                totalInvestments,
                totalInvestmentAmount: totalInvestmentAmount[0]?.total || 0,
            },
        });
    }
);

// Delete investment (soft-delete by marking status as 'inactive')
export const deleteInvestment = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const investment = await investmentModel.findById(id);
        if (!investment) {
            throw new NotFoundError("Investment not found");
        }

        await investment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Investment deleted",
        });
    }
);
