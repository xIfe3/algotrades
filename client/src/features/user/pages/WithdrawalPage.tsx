import Breadcrumb from "../../../components/common/Breadcrumbs";
import WithdrawalFrom from "../../../components/Forms/WithdrawalForm";
import { FaMoneyBillWave } from "react-icons/fa";

const WithdrawalPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-4 lg:p-6 space-y-6">
                {/* Modern Breadcrumb */}
                <Breadcrumb dashboardUrl="" currentPage="Withdraw" />

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <FaMoneyBillWave className="text-red-600 text-lg" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Withdraw Funds
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Transfer your profits to your wallet
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <WithdrawalFrom />
                </div>
            </div>
        </div>
    );
};

export default WithdrawalPage;
