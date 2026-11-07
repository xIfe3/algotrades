import TradingViewWidget from "../../../components/common/TradingViewWidget";
import CardList from "../../../components/Dashboard/user/CardList";
import CurrentInvestmentPlan from "../../../components/Dashboard/user/CurrentInvestmentPlan";
import DashboardHeader from "../../../components/Dashboard/user/DashboardHeader";
import ReferralLink from "../../../components/Dashboard/user/ReferralLink";
import {
    useGetUserWalletQuery,
    useGetUserTotalDepositQuery,
    useGetUserTotalWithdrawalQuery,
    useGetUserProfileQuery,
} from "../api/userApiSlice";
import { IoAlertCircle } from "react-icons/io5";

const DashboardPage = () => {
    const {
        data: walletData,
        error: walletError,
        isLoading: isWalletLoading,
    } = useGetUserWalletQuery({});
    const {
        data: totalDeposit = 0.0,
        error: totalDepositError,
        isLoading: isTotalDepositLoading,
    } = useGetUserTotalDepositQuery({});
    const {
        data: totalWithdrawal = 0.0,
        error: totalWithdrawalError,
        isLoading: isTotalWithdrawalLoading,
    } = useGetUserTotalWithdrawalQuery({});
    const {
        data: userProfileData = {},
        error: userProfileError,
        isLoading: isUserProfileLoading,
    } = useGetUserProfileQuery({});

    // Modern loading component
    if (
        isUserProfileLoading ||
        isWalletLoading ||
        isTotalDepositLoading ||
        isTotalWithdrawalLoading
    ) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                    <p className="text-gray-600 font-medium">
                        Loading your dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // Modern error component
    if (
        userProfileError ||
        totalDepositError ||
        totalWithdrawalError ||
        walletError
    ) {
        const errorMessage = userProfileError
            ? "Error fetching user profile"
            : totalDepositError
              ? "Error fetching deposit data"
              : totalWithdrawalError
                ? "Error fetching withdrawal data"
                : "Error fetching wallet data";

        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                    <div className="flex items-center space-x-3 mb-4">
                        <IoAlertCircle className="text-red-500 text-2xl" />
                        <h3 className="text-xl font-semibold text-gray-900">
                            Something went wrong
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-6">{errorMessage}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Dashboard Container */}
            <div className="p-4 lg:p-6 space-y-6">
                {/* Trading View Widget */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <TradingViewWidget />
                </div>

                {/* Welcome Header */}
                <DashboardHeader username={userProfileData.user?.username} />

                {/* Stats Cards */}
                <CardList
                    balance={walletData?.wallet?.balance}
                    deposit={totalDeposit?.totalAmount}
                    withdrawal={totalWithdrawal?.totalAmount}
                    profit={walletData?.wallet?.profit}
                    referralBonus={walletData?.wallet?.referralBonus}
                />

                {/* Investment and Referral Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <CurrentInvestmentPlan
                        investmentPlan={userProfileData?.user?.currentPlan}
                    />
                    <ReferralLink link={userProfileData?.user?.referralLink} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
