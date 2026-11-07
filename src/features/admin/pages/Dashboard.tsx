import StatsSection from "../../../components/Admin/StatsSection";
import { useGetAllUsersQuery } from "../api/adminApiSlice";
import { FaUsers, FaChartLine, FaWallet } from "react-icons/fa";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";

const Dashboard = () => {
    const { data: users, isLoading, error } = useGetAllUsersQuery({});

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading dashboard...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="text-red-400 mr-3">
                        <FaChartLine />
                    </div>
                    <p className="text-red-800">
                        Error loading dashboard data. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard Overview
                </h1>
                <p className="text-gray-600 mt-1">
                    Welcome to your admin control center
                </p>
            </div>

            {/* Quick Stats */}
            <StatsSection />

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            User Growth
                        </h2>
                        <FaUsers className="text-blue-600" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                Total Users
                            </span>
                            <span className="font-semibold text-gray-900">
                                {users?.users?.length || 0}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                Active Users
                            </span>
                            <span className="font-semibold text-green-600">
                                {users?.users?.filter(
                                    (user: any) => !user.isSuspended,
                                ).length || 0}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                Suspended Users
                            </span>
                            <span className="font-semibold text-red-600">
                                {users?.users?.filter(
                                    (user: any) => user.isSuspended,
                                ).length || 0}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Quick Actions
                        </h2>
                        <FaChartLine className="text-blue-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href="/admin/deposits/pending"
                            className="flex items-center p-3 border border-gray-200 rounded-lg transition-colors active:bg-gray-50"
                        >
                            <PiHandDepositFill className="text-orange-500 mr-3" />
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    Pending
                                </div>
                                <div className="text-xs text-gray-500">
                                    Deposits
                                </div>
                            </div>
                        </a>
                        <a
                            href="/admin/withdrawals/pending"
                            className="flex items-center p-3 border border-gray-200 rounded-lg transition-colors active:bg-gray-50"
                        >
                            <PiHandWithdrawFill className="text-red-500 mr-3" />
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    Pending
                                </div>
                                <div className="text-xs text-gray-500">
                                    Withdrawals
                                </div>
                            </div>
                        </a>
                        <a
                            href="/admin/investments"
                            className="flex items-center p-3 border border-gray-200 rounded-lg transition-colors active:bg-gray-50"
                        >
                            <FaWallet className="text-green-500 mr-3" />
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    Manage
                                </div>
                                <div className="text-xs text-gray-500">
                                    Investments
                                </div>
                            </div>
                        </a>
                        <a
                            href="/admin/wallets"
                            className="flex items-center p-3 border border-gray-200 rounded-lg transition-colors active:bg-gray-50"
                        >
                            <FaUsers className="text-purple-500 mr-3" />
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    User
                                </div>
                                <div className="text-xs text-gray-500">
                                    Wallets
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Recent Users
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Latest registered users
                    </p>
                </div>
                <div className="p-6">
                    {users?.users
                        ?.slice(0, 5)
                        .map((user: any, index: number) => (
                            <div
                                key={user._id}
                                className={`flex items-center justify-between py-3 ${index !== 4 ? "border-b border-gray-100" : ""}`}
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FaUsers className="text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.fullName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {user.isSuspended ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Suspended
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-500">
                                        {new Date(
                                            user.createdAt,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    {(!users?.users || users.users.length === 0) && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No users found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        System Health
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 font-medium">
                            All Systems Operational
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            99.9%
                        </div>
                        <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            24ms
                        </div>
                        <div className="text-sm text-gray-600">
                            Response Time
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            0
                        </div>
                        <div className="text-sm text-gray-600">
                            Errors Today
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
