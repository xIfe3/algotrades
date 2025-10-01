import { useState } from "react";
import { Card, Select, Label, Badge, Button } from "flowbite-react";
import StatsSection from "../../../components/Admin/StatsSection";
import InvestmentManagementTable from "../../../components/Admin/Tables/InvestmentManagementTable";
import WalletUpdateModal from "../../../components/Admin/WalletUpdateModal";
import {
    useGetAllInvestmentsQuery,
    useGetInvestmentStatsQuery,
    useGetAllUserWalletsQuery,
} from "../api/adminApiSlice.tsx";
import formatAmount from "../../../config/format.ts";
import { FaWallet } from "react-icons/fa";

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
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                <p>Loading investments...</p>
            </div>
        );
    }

    if (investmentsError) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                <p className="text-red-500">
                    Error loading investments. Please try again.
                </p>
            </div>
        );
    }

    const investments = investmentsData?.investments || [];

    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-6">
            {/* Stats Section */}
            <StatsSection />

            {/* Investment Statistics */}
            {!statsLoading && statsData && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <div className="flex items-center">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600">
                                    Total Investments
                                </p>
                                <p className="text-2xl font-bold">
                                    {statsData.stats.totalInvestments}
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600">
                                    Total Amount
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                    $
                                    {formatAmount(
                                        statsData.stats.totalInvestmentAmount,
                                    )}
                                </p>
                            </div>
                        </div>
                    </Card>
                    {statsData.stats.byStatus?.map((stat: any) => (
                        <Card key={stat._id}>
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm text-gray-600 capitalize">
                                            {stat._id} Investments
                                        </p>
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
                                    <p className="text-lg font-bold">
                                        ${formatAmount(stat.totalAmount)}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Filters and Controls */}
            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <div>
                            <Label htmlFor="statusFilter" className="text-sm">
                                Filter by Status:
                            </Label>
                            <Select
                                id="statusFilter"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="mt-1"
                            >
                                <option value="">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="completed">Completed</option>
                                <option value="terminated">Terminated</option>
                            </Select>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            color="blue"
                            onClick={refetchInvestments}
                            size="sm"
                        >
                            Refresh Data
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Investment Management Table */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                        Investment Management
                    </h3>
                    <Badge color="info">
                        {investments.length} investment(s)
                    </Badge>
                </div>

                <InvestmentManagementTable
                    investments={investments}
                    refetch={refetchInvestments}
                />
            </Card>

            {/* Quick Wallet Management */}
            {walletsData?.wallets && (
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center space-x-2">
                            <FaWallet />
                            <span>Quick Wallet Updates</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {walletsData.wallets.slice(0, 6).map((wallet: any) => (
                            <div
                                key={wallet._id}
                                className="p-4 border rounded-lg"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">
                                            {wallet.user.fullName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            @{wallet.user.username}
                                        </p>
                                    </div>
                                    <Button
                                        size="xs"
                                        onClick={() =>
                                            handleWalletUpdate(wallet)
                                        }
                                    >
                                        Update
                                    </Button>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Balance:</span>
                                        <span className="font-medium">
                                            ${formatAmount(wallet.balance)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Profit:</span>
                                        <span className="font-medium text-green-600">
                                            ${formatAmount(wallet.profit)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Referral:</span>
                                        <span className="font-medium text-blue-600">
                                            $
                                            {formatAmount(wallet.referralBonus)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
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
