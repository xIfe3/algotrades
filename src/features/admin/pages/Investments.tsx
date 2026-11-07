import { useState } from "react";
import { Select, Label, Badge } from "flowbite-react";
import StatsSection from "../../../components/Admin/StatsSection";
import InvestmentManagementTable from "../../../components/Admin/Tables/InvestmentManagementTable";
import WalletUpdateModal from "../../../components/Admin/WalletUpdateModal";
import {
    useGetAllInvestmentsQuery,
    useGetInvestmentStatsQuery,
    useGetAllUserWalletsQuery,
} from "../api/adminApiSlice.tsx";
import formatAmount from "../../../config/format.ts";
import { FaWallet, FaChartLine, FaFilter, FaInfoCircle } from "react-icons/fa";

const Investments = () => {
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [showWalletModal, setShowWalletModal] = useState(false);

    const {
        data: investmentsData,
        isLoading: investmentsLoading,
        error: investmentsError,
        refetch: refetchInvestments,
    } = useGetAllInvestmentsQuery({
        status: statusFilter || undefined,
    });

    const { data: statsData, isLoading: statsLoading } =
        useGetInvestmentStatsQuery({});

    const { data: walletsData, refetch: refetchWallets } =
        useGetAllUserWalletsQuery({});

    const handleWalletUpdate = (wallet: any) => {
        setSelectedWallet(wallet);
        setShowWalletModal(true);
    };

    const handleWalletUpdateSuccess = () => {
        refetchWallets();
        refetchInvestments();
    };

    if (investmentsLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">
                    Loading investments...
                </span>
            </div>
        );
    }

    if (investmentsError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="text-red-400 mr-3">
                        <FaInfoCircle />
                    </div>
                    <p className="text-red-800">
                        Error loading investments. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    const investments = investmentsData?.investments || [];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Investment Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Monitor and manage all investments
                    </p>
                </div>
                <button
                    onClick={refetchInvestments}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white shadow-sm transition-all duration-200 active:bg-gray-50"
                >
                    <FaChartLine className="w-4 h-4 mr-2" />
                    Refresh Data
                </button>
            </div>

            {/* Stats Section */}
            <StatsSection />

            {/* Investment Statistics */}
            {!statsLoading && statsData && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Investment Statistics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                            <div className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                                Total Investments
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                {statsData.stats.totalInvestments}
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                            <div className="text-sm font-medium text-green-600 uppercase tracking-wide">
                                Total Amount
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                $
                                {formatAmount(
                                    statsData.stats.totalInvestmentAmount,
                                )}
                            </div>
                        </div>
                        {statsData.stats.byStatus?.map((stat: any) => (
                            <div
                                key={stat._id}
                                className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm font-medium text-gray-600 tracking-wide capitalize">
                                        {stat._id} Investments
                                    </div>
                                    <Badge
                                        color={
                                            stat._id === "active"
                                                ? "success"
                                                : stat._id === "completed"
                                                  ? "info"
                                                  : stat._id === "paused"
                                                    ? "warning"
                                                    : "failure"
                                        }
                                    >
                                        {stat.count}
                                    </Badge>
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                    ${formatAmount(stat.totalAmount)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <FaFilter className="text-gray-400" />
                        <div>
                            <Label
                                htmlFor="statusFilter"
                                className="text-sm font-medium"
                            >
                                Filter by Status
                            </Label>
                            <Select
                                id="statusFilter"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="mt-1 min-w-[160px]"
                            >
                                <option value="">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="completed">Completed</option>
                                <option value="terminated">Terminated</option>
                            </Select>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600">
                        Showing {investments.length} investment(s)
                    </div>
                </div>
            </div>

            {/* Investment Management Table */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        All Investments
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage investment status, profits, and user wallets
                    </p>
                </div>
                <InvestmentManagementTable
                    investments={investments}
                    refetch={refetchInvestments}
                />
            </div>

            {/* Quick Wallet Management */}
            {walletsData?.wallets && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                            <FaWallet className="text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Quick Wallet Updates
                            </h2>
                        </div>
                        <div className="text-sm text-gray-600">
                            {walletsData.wallets.length} total wallets
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {walletsData.wallets.slice(0, 6).map((wallet: any) => (
                            <div
                                key={wallet._id}
                                className="border border-gray-200 rounded-lg p-4 transition-all duration-200"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {wallet.user.fullName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            @{wallet.user.username}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleWalletUpdate(wallet)
                                        }
                                        className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md transition-colors active:bg-blue-100"
                                    >
                                        Update
                                    </button>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Balance:
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            ${formatAmount(wallet.balance)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Profit:
                                        </span>
                                        <span className="font-medium text-green-600">
                                            ${formatAmount(wallet.profit)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Referral:
                                        </span>
                                        <span className="font-medium text-blue-600">
                                            $
                                            {formatAmount(wallet.referralBonus)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Wallet Update Modal */}
            <WalletUpdateModal
                wallet={selectedWallet}
                isOpen={showWalletModal}
                onClose={() => {
                    setShowWalletModal(false);
                    setSelectedWallet(null);
                }}
                onSuccess={handleWalletUpdateSuccess}
            />
        </div>
    );
};

export default Investments;
