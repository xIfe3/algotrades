import { useState } from "react";
import StatsSection from "../../../components/Admin/StatsSection";
import { UserTable } from "../../../components/Admin/Tables/UsersTable";
import { useGetAllUsersQuery } from "../api/adminApiSlice";
import RefetchButton from "../../../components/Admin/RefetchButton";
import { FaInfoCircle, FaTimes } from "react-icons/fa";

const Users = () => {
    const { data: users, isLoading, error, refetch } = useGetAllUsersQuery({});
    const [showNotification, setShowNotification] = useState(true);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading users...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="text-red-400 mr-3">
                        <FaInfoCircle />
                    </div>
                    <p className="text-red-800">
                        Error loading users. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Users Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage all registered users
                    </p>
                </div>
                <RefetchButton refetch={refetch} />
            </div>

            {/* Info Notification */}
            {showNotification && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <div className="text-blue-400 mr-3 mt-0.5">
                            <FaInfoCircle />
                        </div>
                        <div className="flex-1">
                            <p className="text-blue-800 text-sm">
                                To validate a pending deposit, navigate to the
                                'Pending Deposits' page. Then, select the action
                                dropdown and choose either 'Approve' or
                                'Decline' for the deposit.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowNotification(false)}
                            className="text-blue-400 ml-3 transition-colors duration-200 active:text-blue-600"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}

            {/* Stats Section */}
            <StatsSection />

            {/* Users Table */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        All Users
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {users?.users?.length || 0} total users
                    </p>
                </div>
                <UserTable users={users?.users} />
            </div>
        </div>
    );
};

export default Users;
