import DepositForm from "../../../components/Forms/DepositForm";
import CryptoReceiveCard from "../../../components/Dashboard/user/CrypoReceiveCard";
import Breadcrumb from "../../../components/common/Breadcrumbs";
import { FaCoins, FaInfoCircle, FaShieldAlt } from "react-icons/fa";

const DepositPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-4 lg:p-6 space-y-6">
                {/* Modern Breadcrumb */}
                <Breadcrumb dashboardUrl="" currentPage="Deposit" />

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FaCoins className="text-blue-600 text-lg" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Make a Deposit
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Add funds to your trading account securely
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content - Form Left, Terms Right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Deposit Form */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FaCoins className="text-green-600 text-sm" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Deposit Form
                                </h2>
                            </div>
                            <DepositForm />
                        </div>
                    </div>

                    {/* Right Side - Terms and Instructions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaInfoCircle className="text-blue-600 text-sm" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    How to Deposit
                                </h2>
                            </div>
                            <CryptoReceiveCard />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                            <div className="flex items-start space-x-3">
                                <FaShieldAlt className="text-amber-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-amber-800 mb-3">
                                        Important Terms
                                    </h3>
                                    <ul className="text-sm text-amber-700 space-y-2">
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>
                                                Minimum deposit amount varies by
                                                plan
                                            </span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>
                                                Deposits are processed within
                                                1-3 business days
                                            </span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>
                                                All transactions are secured
                                                with bank-level encryption
                                            </span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>
                                                Contact support for any
                                                deposit-related issues
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
