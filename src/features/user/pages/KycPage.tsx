import Breadcrumb from "../../../components/common/Breadcrumbs";
import KYCForm from "../../../components/Forms/KycVerificationForm";
import { FaShieldAlt, FaUserCheck, FaLock } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";

const KycPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-4 lg:p-6 space-y-6">
                {/* Modern Breadcrumb */}
                <Breadcrumb dashboardUrl="" currentPage="KYC" />

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FaShieldAlt className="text-blue-600 text-lg" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Identity Verification
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Complete KYC to unlock all trading features
                            </p>
                        </div>
                    </div>

                    {/* KYC Benefits */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <HiShieldCheck className="text-blue-600 text-sm" />
                                <span className="font-medium text-blue-800 text-sm">
                                    Enhanced Security
                                </span>
                            </div>
                            <p className="text-xs text-blue-600 mt-1">
                                Protect your account
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <FaUserCheck className="text-gray-600 text-sm" />
                                <span className="font-medium text-gray-800 text-sm">
                                    Higher Limits
                                </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                Increased trading limits
                            </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <MdVerifiedUser className="text-green-600 text-sm" />
                                <span className="font-medium text-green-800 text-sm">
                                    Verified Status
                                </span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                                Trusted trader badge
                            </p>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <FaLock className="text-amber-600 mt-0.5 flex-shrink-0 text-sm" />
                            <div>
                                <h3 className="font-medium text-amber-800 mb-1 text-sm">
                                    Your Privacy is Protected
                                </h3>
                                <p className="text-xs text-amber-700">
                                    All documents are encrypted and stored
                                    securely. We comply with international data
                                    protection standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <KYCForm />
                </div>
            </div>
        </div>
    );
};

export default KycPage;
