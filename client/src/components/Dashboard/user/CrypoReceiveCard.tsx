import { MdInfo, MdSecurity, MdTimeline } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const CryptoReceiveCard = () => {
    return (
        <div className="space-y-6">
            {/* Instructions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Deposit Instructions
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-semibold text-blue-600">
                                1
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-700">
                                Select your preferred investment plan from the
                                dropdown menu
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-semibold text-blue-600">
                                2
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-700">
                                Choose your deposit currency and cryptocurrency
                                type
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-semibold text-blue-600">
                                3
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-700">
                                The amount will be automatically filled based on
                                your selected plan
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-semibold text-blue-600">
                                4
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-700">
                                Submit the form to generate your unique deposit
                                address
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                    <FaCheckCircle className="text-green-600 flex-shrink-0" />
                    <div>
                        <h4 className="font-medium text-green-800">
                            Secure Processing
                        </h4>
                        <p className="text-sm text-green-600">
                            Bank-level encryption
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <MdTimeline className="text-blue-600 flex-shrink-0" />
                    <div>
                        <h4 className="font-medium text-blue-800">
                            Fast Processing
                        </h4>
                        <p className="text-sm text-blue-600">
                            1-3 business days
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <MdSecurity className="text-purple-600 flex-shrink-0" />
                    <div>
                        <h4 className="font-medium text-purple-800">
                            24/7 Support
                        </h4>
                        <p className="text-sm text-purple-600">
                            Customer assistance
                        </p>
                    </div>
                </div>
            </div>

            {/* Support Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start space-x-3">
                    <MdInfo className="text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                            Need Help?
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            Our support team is available 24/7 to assist you
                            with any deposit-related questions.
                        </p>
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoReceiveCard;
