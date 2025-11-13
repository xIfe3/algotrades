// import cron from "node-cron";
import userModel from "./models/user.model";
import planModel from "./models/plan.model";
import walletModel from "./models/wallet.model";
import investmentModel from "./models/investment.model";
import Agenda from "agenda";

const MONGO_DB_URI = process.env.LOCAL_DB_URI || "";

const calculateProfit = async () => {
    try {
        // Fetch all users with an active investment plan
        const users = await userModel.find({
            "currentPlan.planId": { $ne: null },
        });

        for (const user of users) {
            const { planId, simulatedDays = 0, endDate } = user.currentPlan;
            const plan = await planModel.findById(planId);

            // Ensure the plan exists
            if (!plan) {
                console.log(
                    `Plan not found for user ${user.username}, removing currentPlan`
                );
                user.currentPlan = null;
                await user.save();
                continue;
            }

            // Check if the investment has already exceeded its duration
            if (simulatedDays >= plan.duration) {
                console.log(
                    `Investment duration exceeded for user ${user.username}, ending plan`
                );
                user.currentPlan = null;
                await user.save();

                // Update investment status to completed
                await investmentModel.findOneAndUpdate(
                    {
                        user: user._id,
                        "plan.planId": planId,
                        status: "active",
                    },
                    {
                        status: "completed",
                        profitAccumulated: user.currentPlan.profitAccumulated,
                    }
                );
                continue;
            }

            // Check if the end date has been reached
            const currentDate = new Date();
            if (endDate && new Date(endDate) <= currentDate) {
                console.log(
                    `End date reached for user ${user.username}, ending plan`
                );
                user.currentPlan = null;
                await user.save();

                // Update investment status to completed
                await investmentModel.findOneAndUpdate(
                    {
                        user: user._id,
                        "plan.planId": planId,
                        status: "active",
                    },
                    {
                        status: "completed",
                        profitAccumulated: user.currentPlan.profitAccumulated,
                    }
                );
                continue;
            }

            // Calculate daily profit
            const dailyProfit = plan.profit / plan.duration;

            // Check if this is the last day (simulatedDays will equal duration - 1)
            if (simulatedDays + 1 >= plan.duration) {
                // This is the last day - add final profit and complete the plan
                await walletModel.findOneAndUpdate(
                    { "user.userId": user._id },
                    { $inc: { profit: dailyProfit } }
                );

                const finalProfitAccumulated =
                    user.currentPlan.profitAccumulated + dailyProfit;

                // Update investment status to completed
                await investmentModel.findOneAndUpdate(
                    {
                        user: user._id,
                        "plan.planId": planId,
                        status: "active",
                    },
                    {
                        status: "completed",
                        profitAccumulated: finalProfitAccumulated,
                    }
                );

                user.currentPlan = null; // Remove the plan after completion
                await user.save();

                console.log(
                    `Completed investment for user ${
                        user.username
                    } with final profit ${dailyProfit} (Day ${
                        simulatedDays + 1
                    } of ${plan.duration})`
                );
            } else {
                // Normal day - increment profit and day count
                await walletModel.findOneAndUpdate(
                    { "user.userId": user._id },
                    { $inc: { profit: dailyProfit } }
                );

                // Increment the simulated day count
                user.currentPlan.simulatedDays += 1;
                user.currentPlan.profitAccumulated += dailyProfit;
                await user.save();

                console.log(
                    `Updated profit for user ${user.username} by ${dailyProfit} (Day ${user.currentPlan.simulatedDays} of ${plan.duration})`
                );
            }
        }
    } catch (error) {
        console.error("Error updating profits:", error);
    }
};

const agenda = new Agenda({
    db: { address: MONGO_DB_URI },
});

agenda.define("calculate daily profit", async () => {
    console.log("Job started: calculate daily profit");
    try {
        await calculateProfit();
        console.log("Job completed successfully: calculate daily profit");
    } catch (error) {
        console.error("Job failed: calculate daily profit", error);
    }
});

(async function () {
    await agenda.start();
    // Schedule the job to run every minute on weekdays (Monday to Friday)
    await agenda.every("50 23 * * 1-5", "calculate daily profit");
})();
