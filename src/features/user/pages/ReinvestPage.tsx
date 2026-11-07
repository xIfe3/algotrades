import Breadcrumb from "../../../components/common/Breadcrumbs";
import ReinvestForm from "../../../components/Forms/ReinvestForm";
import { FaChartLine, FaCoins } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { HiTrendingUp } from "react-icons/hi";

const ReinvestPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-4 lg:p-6 space-y-6">
                {/* Modern Breadcrumb */}
                <Breadcrumb dashboard="/dashboard/me" currentPage="Reinvest" />

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <LuRefreshCcw className="text-green-600 text-lg" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Reinvest Profits
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Compound your earnings with smart reinvestment
                            </p>
                        </div>
                    </div>

                    {/* Reinvestment Benefits */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <HiTrendingUp className="text-green-600 text-sm" />
                                <span className="font-medium text-green-800 text-sm">
                                    Compound Growth
                                </span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                                Maximize your returns
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <FaCoins className="text-gray-600 text-sm" />
                                <span className="font-medium text-gray-800 text-sm">
                                    Auto Scaling
                                </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                Scale your investments
                            </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <FaChartLine className="text-blue-600 text-sm" />
                                <span className="font-medium text-blue-800 text-sm">
                                    Smart Strategy
                                </span>
                            </div>
                            <p className="text-xs text-blue-600 mt-1">
                                Automated optimization
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <ReinvestForm />
                </div>
            </div>
        </div>
    );
};

export default ReinvestPage;
