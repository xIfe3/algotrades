import LoginForm from "../../../components/Forms/LoginForm";
import { Link } from "react-router-dom";
import { FaLock, FaChartLine } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
                        <FaChartLine className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">
                        Sign in to continue to{" "}
                        <Link
                            to="/"
                            className="text-blue-600 font-semibold hover:text-blue-700"
                        >
                            AlgoTrades
                        </Link>
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <FaLock className="text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Login to Your Account
                        </h2>
                    </div>

                    <LoginForm />

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                New to AlgoTrades?
                            </span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <Link
                            to="/auth/register"
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <HiSparkles className="text-lg" />
                            <span>Create a free account</span>
                        </Link>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-gray-700">
                        Terms of Service
                    </Link>
                    <span className="mx-2">•</span>
                    <Link to="/" className="hover:text-gray-700">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
