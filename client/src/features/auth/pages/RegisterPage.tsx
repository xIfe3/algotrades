import { Link, useLocation } from "react-router-dom";
import RegisterForm from "../../../components/Forms/RegisterForm";
import { FaUserPlus, FaChartLine, FaShieldAlt, FaUsers } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const RegisterPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const refToken = searchParams.get("ref");

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
                        <FaChartLine className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Join AlgoTrades
                    </h1>
                    <p className="text-gray-600">
                        Start your trading journey with us today
                    </p>
                </div>

                {/* Benefits Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                        <FaShieldAlt className="text-blue-600 text-2xl mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900 text-sm">
                            Secure Trading
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Bank-level security
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                        <HiSparkles className="text-green-600 text-2xl mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900 text-sm">
                            High Returns
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Profitable investments
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                        <FaUsers className="text-purple-600 text-2xl mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900 text-sm">
                            24/7 Support
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Always here to help
                        </p>
                    </div>
                </div>

                {/* Registration Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <FaUserPlus className="text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Create Your Account
                        </h2>
                    </div>

                    {refToken && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-green-800 text-center">
                                🎉 You've been referred! Get started to claim
                                your bonus.
                            </p>
                        </div>
                    )}

                    <RegisterForm refToken={refToken} />

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <Link
                            to="/auth/login"
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <span>Sign in instead</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    By registering, you agree to our{" "}
                    <Link to="/" className="text-blue-600 hover:text-blue-700">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/" className="text-blue-600 hover:text-blue-700">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
