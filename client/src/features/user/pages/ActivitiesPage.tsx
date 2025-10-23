import ActivitiesTable from "../../../components/Tables/ActivitesTable";
import Breadcrumb from "../../../components/common/Breadcrumbs";
import { FaHistory, FaExchangeAlt } from "react-icons/fa";

const ActivitiesPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-4 lg:p-6 space-y-6">
                {/* Modern Breadcrumb */}
                <Breadcrumb dashboardUrl="" currentPage="Activities" />

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FaHistory className="text-gray-600 text-lg" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Transaction History
                                </h1>
                                <p className="text-gray-600 text-sm mt-1">
                                    View all your trading activities and
                                    transactions
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                <FaExchangeAlt className="text-gray-600 text-sm" />
                                <span className="text-sm font-medium text-gray-700">
                                    All Transactions
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <ActivitiesTable />
                </div>
            </div>
        </div>
    );
};

export default ActivitiesPage;
