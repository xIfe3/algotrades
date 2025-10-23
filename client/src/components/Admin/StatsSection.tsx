import { PiHandDepositFill } from "react-icons/pi";
import { MdOutlinePending } from "react-icons/md";
import { PiHandWithdrawFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import StatCard from "./StatCard";
import {
    useGetTotalUsersQuery,
    useGetTotalDepositQuery,
    useGetTotalWithdrawalQuery,
    useGetAllPendingDepositsQuery,
} from "../../features/admin/api/adminApiSlice";
import formatAmount from "../../config/format";

const StatsSection = () => {
    // Fetching the data from the corresponding API endpoints
    const { data: totalUsers, isLoading: usersLoading } =
        useGetTotalUsersQuery(undefined);
    const { data: totalDeposit, isLoading: depositLoading } =
        useGetTotalDepositQuery({});
    const { data: totalWithdrawal, isLoading: withdrawalLoading } =
        useGetTotalWithdrawalQuery({});
    const { data: pendingDeposits, isLoading: pendingLoading } =
        useGetAllPendingDepositsQuery({});

    // Handling loading states
    if (usersLoading || depositLoading || withdrawalLoading || pendingLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                                <div className="h-8 bg-gray-200 rounded w-20"></div>
                            </div>
                            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                icon={<FaUsers />}
                title="Total Users"
                value={totalUsers?.totalUsers || 0}
                color="blue"
            />
            <StatCard
                icon={<PiHandDepositFill />}
                title="Total Deposits"
                value={`$${formatAmount(totalDeposit?.totalAmount || 0)}`}
                color="green"
            />
            <StatCard
                icon={<PiHandWithdrawFill />}
                title="Total Withdrawals"
                value={`$${formatAmount(totalWithdrawal?.totalAmount || 0)}`}
                color="purple"
            />
            <StatCard
                icon={<MdOutlinePending />}
                title="Pending Deposits"
                value={pendingDeposits?.deposits?.length || 0}
                color="orange"
            />
        </div>
    );
};

export default StatsSection;
