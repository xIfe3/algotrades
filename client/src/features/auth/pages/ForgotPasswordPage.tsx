import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../api/authApiSlice.ts";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import FormInput from "../../../components/common/FormInput.tsx";
import { LoadingBackdrop } from "../../../components/LoadingBackdrop.tsx";
import { FaKey, FaChartLine, FaInfoCircle } from "react-icons/fa";

interface FormState {
    emailOrUsername: string | null;
}

const ForgotPasswordPage: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        emailOrUsername: null,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const errorRef = useRef<HTMLDivElement>(null);
    const emailOrUsernameRef = useRef<HTMLInputElement>(null);

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await forgotPassword(formState).unwrap();
            console.log(`RESPONSE: ${response}`);
        } catch (error: any) {
            console.error(`ERROR: ${error}`);
            // Set error message or handle error case here
            setErrorMessage(error?.data?.message || "An error occurred");
        }
    };

    useEffect(() => {
        if (emailOrUsernameRef.current) emailOrUsernameRef.current.focus();
    }, []);

    useEffect(() => {
        if (errorRef.current) errorRef.current.focus();
    }, [errorMessage]);

    useEffect(() => {
        setErrorMessage(null); // Clear error message when form fields change
    }, [formState.emailOrUsername]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
                        <FaChartLine className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Forgot Password?
                    </h1>
                    <p className="text-gray-600">
                        No worries, we'll send you reset instructions
                    </p>
                </div>

                {/* Reset Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <FaKey className="text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Reset Your Password
                        </h2>
                    </div>

                    {/* Info Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-2">
                            <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-800">
                                Enter your email or username and we'll send you
                                a link to reset your password.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleOnSubmit}>
                        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                            <FormInput
                                id="emailOrUsername"
                                label="Email or Username"
                                name="emailOrUsername"
                                value={formState.emailOrUsername}
                                onChange={handleOnChange}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#2563EB",
                                fontWeight: "600",
                                padding: "12px 0",
                                fontSize: "16px",
                                textTransform: "none",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#1D4ED8",
                                },
                            }}
                            disabled={isLoading}
                        >
                            Send Reset Link
                        </Button>
                    </form>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Remember your password?
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

            <LoadingBackdrop open={isLoading} />
        </div>
    );
};

export default ForgotPasswordPage;
