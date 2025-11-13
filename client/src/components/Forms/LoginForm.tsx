import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, FormControlLabel, Checkbox } from "@mui/material";
import { AppDispatch } from "../../app/store.ts";
import { setCredentials } from "../../features/auth/slices/authSlice.ts";
import { useLoginMutation } from "../../features/auth/api/authApiSlice.ts";
import FormInput from "../common/FormInput.tsx";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";

interface FormState {
    emailOrUsername: string | null;
    password: string | null;
}

const LoginForm = () => {
    const [formState, setFormState] = useState<FormState>({
        emailOrUsername: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");

    const emailOrUsernameRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(formState).unwrap();
            const { accessToken, role, isVerified } = response;

            setSuccessMessage("Login successful");
            setStatusType("success");
            setShowAlert(true);
            setFormState({ emailOrUsername: "", password: "" });

            setTimeout(() => {
                dispatch(setCredentials({ accessToken }));
                if (role === "admin") {
                    navigate("/admin");
                } else if (role === "user") {
                    if (isVerified) {
                        navigate("/dashboard/me");
                    } else {
                        navigate("/auth/verify-email");
                    }
                } else {
                    navigate("/");
                }
            }, 3000);
        } catch (error: any) {
            setErrorMessage(error?.data?.message);
            setShowAlert(true);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault();
    };

    const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (emailOrUsernameRef.current) emailOrUsernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [formState.emailOrUsername, formState.password]);

    return (
        <form onSubmit={handleOnSubmit} className="space-y-4">
            <FormInput
                id="emailOrUsername"
                label="Email or Username"
                name="emailOrUsername"
                value={formState.emailOrUsername}
                onChange={handleOnChange}
                ref={emailOrUsernameRef}
            />

            <FormInput
                id="password"
                label="Password"
                name="password"
                value={formState.password}
                onChange={handleOnChange}
                type="password"
                showPassword={showPassword}
                onClickShowPassword={handleClickShowPassword}
                onMouseDownPassword={handleMouseDownPassword}
                onMouseUpPassword={handleMouseUpPassword}
            />

            <div className="flex items-center justify-between">
                <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                        <span className="text-sm text-gray-600">
                            Remember Me
                        </span>
                    }
                />
                <Link
                    to="/auth/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Forgot Password?
                </Link>
            </div>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: "#2563eb",
                    fontWeight: "600",
                    padding: "12px 0",
                    fontSize: "16px",
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                        backgroundColor: "#1d4ed8",
                    },
                }}
                disabled={isLoading}
            >
                {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <AlertMessage
                errorMessage={errorMessage}
                successMessage={successMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />

            <LoadingBackdrop open={isLoading} />
        </form>
    );
};

export default LoginForm;
