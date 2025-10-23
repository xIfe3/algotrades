import { useState } from "react";
import {
    useGetAllUserDepositsQuery,
    useGetAllUserWithdrawalsQuery,
    useGetUserTransfersQuery,
} from "../../features/user/api/userApiSlice";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";

const WalletTable = () => {
    const [activeTab, setActiveTab] = useState<string>("all");

    // Fetch deposits, withdrawals, and transfers
    const {
        data: deposits = { deposits: [] },
        error: depositsError,
        isLoading: depositsLoading,
    } = useGetAllUserDepositsQuery({});

    const {
        data: withdrawals = { withdrawals: [] },
        error: withdrawalsError,
        isLoading: withdrawalsLoading,
    } = useGetAllUserWithdrawalsQuery({});

    const {
        data: transfers = { transfers: [] },
        error: transfersError,
        isLoading: transfersLoading,
    } = useGetUserTransfersQuery({});

    const depositsData = deposits?.deposits || [];
    const withdrawalsData = withdrawals?.withdrawals || [];
    const transfersData = transfers?.transfers || [];

    // Combine all transactions and add a 'type' for filtering
    const allTransactions = [
        ...depositsData.map((deposit: any) => ({
            ...deposit,
            type: "Deposit",
        })),
        ...withdrawalsData.map((withdrawal: any) => ({
            ...withdrawal,
            type: "Withdrawal",
        })),
        ...transfersData.map((transfer: any) => ({
            ...transfer,
            type: "Transfer",
        })),
    ];

    const filteredTransactions = allTransactions.filter((transaction) => {
        if (activeTab === "all") return true;
        if (activeTab === "withdrawals")
            return transaction.type === "Withdrawal";
        if (activeTab === "deposits") return transaction.type === "Deposit";
        if (activeTab === "transfers") return transaction.type === "Transfer";
        return true;
    });

    // Determine the title based on the active tab
    const currentTabTitle =
        activeTab === "all"
            ? "All Transactions"
            : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    if (depositsLoading || withdrawalsLoading || transfersLoading) {
        return (
            <div className="p-8 text-center">
                <div className="inline-flex items-center space-x-2">
                    <FaSpinner className="animate-spin text-blue-600" />
                    <span className="text-gray-600">
                        Loading transactions...
                    </span>
                </div>
            </div>
        );
    }

    if (depositsError || withdrawalsError || transfersError) {
        return (
            <div className="p-8 text-center">
                <div className="inline-flex items-center space-x-2 text-red-600">
                    <FaExclamationTriangle />
                    <span>Error fetching transactions!</span>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "successful":
            case "approved":
                return "bg-green-100 text-green-800 border-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "failed":
            case "declined":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case "deposit":
                return "bg-blue-100 text-blue-800";
            case "withdrawal":
                return "bg-orange-100 text-orange-800";
            case "transfer":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 mb-6">
                    Transaction Activities
                </h1>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[
                        { id: "all", label: "All Transactions" },
                        { id: "deposits", label: "Deposits" },
                        { id: "withdrawals", label: "Withdrawals" },
                        { id: "transfers", label: "Transfers" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 active:scale-95 ${
                                activeTab === tab.id
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Current Tab Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {currentTabTitle} ({filteredTransactions.length})
                </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Transaction ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction, index) => (
                                <tr
                                    key={index}
                                    className="transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                        {transaction._id.slice(-8)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}
                                        >
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(
                                            transaction.createdAt,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}
                                        >
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {transaction.amount}{" "}
                                        {transaction.currency}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-12 text-center"
                                >
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <FaExclamationTriangle className="text-gray-400 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                No transactions found
                                            </h3>
                                            <p className="text-gray-500">
                                                You haven't made any{" "}
                                                {activeTab === "all"
                                                    ? ""
                                                    : activeTab}{" "}
                                                transactions yet.
                                            </p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WalletTable;
