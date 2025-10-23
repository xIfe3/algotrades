import { useNavigate } from "react-router-dom";
import { FaChartLine, FaMoneyBillWave, FaUserCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const DashboardHeader = ({ username }: any) => {
    const navigate = useNavigate();
    const currentTime = new Date().getHours();

    const getGreeting = () => {
        if (currentTime < 12) return "Good morning";
        if (currentTime < 17) return "Good afternoon";
        return "Good evening";
    };

    const navigateToPlans = () => navigate("/plans");
    const navigateToWithdraw = () => navigate("/dashboard/withdraw");

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <FaUserCircle className="text-white text-lg" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-white">
                                {getGreeting()}, {username}!
                            </h1>
                            <div className="flex items-center space-x-2 mt-1">
                                <HiSparkles className="text-yellow-400 text-sm" />
                                <p className="text-gray-300 text-sm">
                                    Welcome to your trading dashboard
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Notice */}
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400">
                <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                            className="w-3 h-3 text-yellow-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-yellow-800 mb-1">
                            Security Reminder
                        </h3>
                        <p className="text-sm text-yellow-700">
                            Keep your login details private and secure. We will
                            never ask for your credentials via email or phone.
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={navigateToPlans}
                        className="flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 active:scale-95"
                    >
                        <FaChartLine className="text-lg" />
                        <span>View Trading Plans</span>
                    </button>
                    <button
                        onClick={navigateToWithdraw}
                        className="flex items-center justify-center space-x-3 bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 active:scale-95"
                    >
                        <FaMoneyBillWave className="text-lg" />
                        <span>Withdraw Funds</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
