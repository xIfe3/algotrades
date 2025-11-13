import React, { useEffect, useState, useRef } from "react";
import { FormControl, Button } from "@mui/material";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import { useRegisterMutation } from "../../features/auth/api/authApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store.ts";
import { setCredentials } from "../../features/auth/slices/authSlice.ts";
import FormInput from "../common/FormInput.tsx";

const RegisterForm = ({ refToken }: any) => {
    const [formState, setFormState] = useState({
        fullName: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const fullNameRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const handleClickShowPassword = () => setShowPasswords((show) => !show);

    const handleMouseDownPassword = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault();
    };

    const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Trim whitespace from username
        const trimmedFormState = {
            ...formState,
            username: formState.username.trim(),
        };

        if (trimmedFormState.password !== trimmedFormState.confirmPassword) {
            setErrorMessage("Passwords do not match");
            setStatusType("error");
            setShowAlert(true);
            return;
        }

        try {
            const response = await register({
                ...trimmedFormState,
                referralToken: refToken,
            }).unwrap();
            const { accessToken } = response;
            dispatch(setCredentials({ accessToken }));
            navigate("/auth/verify-email");

            setSuccessMessage("Registration successful!");
            setStatusType("success");
            setShowAlert(true);
            setFormState({
                fullName: "",
                username: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error: any) {
            if (error?.status === 400)
                setErrorMessage(error.data.errors[0].message);
            else if (error?.status === "FETCH_ERROR")
                setErrorMessage("No server responded!");
            else setErrorMessage(error?.data?.message);

            setShowAlert(true);
            setStatusType("error");
        }
    };

    useEffect(() => {
        fullNameRef.current?.focus();
    }, []);

    return (
        <form onSubmit={handleOnSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormControl fullWidth>
                    <FormInput
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleOnChange}
                        ref={fullNameRef}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormInput
                        id="username"
                        label="Username"
                        name="username"
                        value={formState.username}
                        onChange={handleOnChange}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormInput
                        id="email"
                        type="email"
                        label="Email Address"
                        name="email"
                        value={formState.email}
                        onChange={handleOnChange}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormInput
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        value={formState.phoneNumber}
                        onChange={handleOnChange}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormInput
                        id="password"
                        label="Password"
                        name="password"
                        value={formState.password}
                        onChange={handleOnChange}
                        type="password"
                        showPassword={showPasswords}
                        onClickShowPassword={handleClickShowPassword}
                        onMouseDownPassword={handleMouseDownPassword}
                        onMouseUpPassword={handleMouseUpPassword}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormInput
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={handleOnChange}
                        type="password"
                        showPassword={showPasswords}
                        onClickShowPassword={handleClickShowPassword}
                        onMouseDownPassword={handleMouseDownPassword}
                        onMouseUpPassword={handleMouseUpPassword}
                    />
                </FormControl>
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
                    marginTop: "24px",
                    "&:hover": {
                        backgroundColor: "#1d4ed8",
                    },
                }}
                disabled={!formState.email || !formState.password || isLoading}
            >
                {isLoading ? "Creating Account..." : "Create Account"}
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

export default RegisterForm;
