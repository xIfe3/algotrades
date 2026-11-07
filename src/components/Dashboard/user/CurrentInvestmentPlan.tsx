import {
    FaDollarSign,
    FaCalendarAlt,
    FaClock,
    FaChartLine,
} from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import formatAmount from "../../../config/format";

const CurrentInvestmentPlan = ({ investmentPlan }: any) => {
    // Check if `investmentPlan` is defined and has a valid `planName`
    const hasValidPlan =
        investmentPlan &&
        investmentPlan.planName &&
        investmentPlan.planName.length > 0;

    if (!hasValidPlan) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <FaChartLine className="text-gray-400 mr-3" />
                        Investment Overview
                    </h2>
                </div>
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaChartLine className="text-gray-400 text-2xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Active Investment
                    </h3>
                    <p className="text-gray-500 mb-6">
                        You don't have any active investment plans at the
                        moment.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                        Explore Investment Plans
                    </button>
                </div>
            </div>
        );
    }

    const calculateProgress = () => {
        if (investmentPlan.simulatedDays && investmentPlan.duration) {
            return Math.min(
                (investmentPlan.simulatedDays / investmentPlan.duration) * 100,
                100,
            );
        }
        return 0;
    };

    const progress = calculateProgress();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <HiTrendingUp className="text-blue-600 mr-3" />
                        Active Investment
                    </h2>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Plan Name */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {investmentPlan.planName}
                    </h3>
                    <p className="text-gray-500">Investment Plan</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <FaDollarSign className="text-green-600" />
                            <span className="text-sm font-medium text-gray-600">
                                Investment
                            </span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                            ${formatAmount(investmentPlan.initialInvestment)}
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <FaDollarSign className="text-purple-600" />
                            <span className="text-sm font-medium text-gray-600">
                                Profit Earned
                            </span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                            $
                            {formatAmount(
                                investmentPlan.profitAccumulated || 0,
                            )}
                        </p>
                    </div>
                </div>

                {/* Progress */}
                {progress > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">
                                Progress
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {investmentPlan.simulatedDays} of{" "}
                            {investmentPlan.duration || "N/A"} days completed
                        </p>
                    </div>
                )}

                {/* Timeline */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                    {investmentPlan.investmentDate && (
                        <div className="flex items-center space-x-3 text-sm">
                            <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
                            <span className="font-medium text-gray-600">
                                Started:
                            </span>
                            <span className="text-gray-900">
                                {new Date(
                                    investmentPlan.investmentDate,
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                    {investmentPlan.endDate && (
                        <div className="flex items-center space-x-3 text-sm">
                            <FaClock className="text-orange-500 flex-shrink-0" />
                            <span className="font-medium text-gray-600">
                                Expected End:
                            </span>
                            <span className="text-gray-900">
                                {new Date(
                                    investmentPlan.endDate,
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CurrentInvestmentPlan;
