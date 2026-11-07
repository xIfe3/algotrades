import Breadcrumb from "../../../components/common/Breadcrumbs";
import ReferralCard from "../../../components/Dashboard/user/AffiliateHeader";
import AffiliateTable from "../../../components/Tables/AffiliateTable";
import { FaUsers } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const AffiliatePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-4 lg:p-6 space-y-6">
                {/* Modern Breadcrumb */}
                <Breadcrumb currentPage="Affiliate" dashboardUrl="" />

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaUsers className="text-green-600 text-lg" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900 flex items-center">
                                    Affiliate Program
                                    <HiSparkles className="text-yellow-500 ml-2 text-lg" />
                                </h1>
                                <p className="text-gray-600 text-sm mt-1">
                                    Earn commissions by referring new traders
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-6">
                            <div className="text-center">
                                <div className="text-xl font-semibold text-green-600">
                                    10%
                                </div>
                                <div className="text-xs text-gray-500">
                                    Commission
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-semibold text-blue-600">
                                    ∞
                                </div>
                                <div className="text-xs text-gray-500">
                                    No Limit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <ReferralCard />
                    <AffiliateTable />
                </div>
            </div>
        </div>
    );
};

export default AffiliatePage;
