import { Link } from "react-router-dom";
import VerifyEmailForm from "../../../components/Forms/VerifyEmailForm";
import { FaEnvelope, FaChartLine, FaCheckCircle } from "react-icons/fa";

const VerifyEmail = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
                        <FaChartLine className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-600">
                        Enter the code sent to your mailbox
                    </p>
                </div>

                {/* Verify Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <FaEnvelope className="text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Enter Verification Code
                        </h2>
                    </div>

                    {/* Info Notice */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-2">
                            <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-green-800">
                                Check your email inbox for the verification
                                code. It may take a few minutes to arrive.
                            </p>
                        </div>
                    </div>

                    <VerifyEmailForm />

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Need help?
                            </span>
                        </div>
                    </div>

                    {/* Back to Login */}
                    <div className="text-center">
                        <Link
                            to="/auth/login"
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <span>Back to Login</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    Didn't receive the code?{" "}
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Resend
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
