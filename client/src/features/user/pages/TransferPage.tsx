import Breadcrumb from "../../../components/common/Breadcrumbs";
import TransferForm from "../../../components/Forms/TransferForm";
import { FaExchangeAlt } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";

const TransferPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-4 lg:p-6 space-y-6">
                {/* Modern Breadcrumb */}
                <Breadcrumb dashboard="/dashboard/me" currentPage="Transfer" />

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BiTransfer className="text-blue-600 text-lg" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Transfer Funds
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Send money to other AlgoTrades users
                            </p>
                        </div>
                    </div>

                    {/* Transfer Features */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <FaExchangeAlt className="text-blue-600 text-sm" />
                                <span className="font-medium text-blue-800 text-sm">
                                    Instant Transfer
                                </span>
                            </div>
                            <p className="text-xs text-blue-600 mt-1">
                                Real-time processing
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <BiTransfer className="text-gray-600 text-sm" />
                                <span className="font-medium text-gray-800 text-sm">
                                    Low Fees
                                </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                Minimal transaction costs
                            </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <FaExchangeAlt className="text-green-600 text-sm" />
                                <span className="font-medium text-green-800 text-sm">
                                    Secure
                                </span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                                Bank-level security
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <TransferForm />
                </div>
            </div>
        </div>
    );
};

export default TransferPage;
