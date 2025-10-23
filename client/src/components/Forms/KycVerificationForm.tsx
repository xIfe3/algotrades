import React, { ChangeEvent, useState } from "react";
import { useUpdateUserMutation } from "../../features/user/api/userApiSlice";
import { Button, FormControl } from "@mui/material";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import FormInput from "../common/FormInput.tsx";
import { useOutletContext } from "react-router-dom"; // To get profile data

interface FormState {
    fullName: string;
    passportNumber: string;
    email: string;
    phoneNumber: string;
    username: string;
    contactAddress: string;
}

const KYCForm = () => {
    const profileData: any = useOutletContext();

    const [formState, setFormState] = useState<FormState>({
        fullName: profileData?.fullName || "", // Prefill full name
        passportNumber: profileData?.passportNumber || "",
        email: profileData?.email || "", // Prefill email
        phoneNumber: profileData?.phoneNumber || "",
        username: profileData?.username || "", // Prefill username
        contactAddress: profileData?.contactAddress || "", // Prefill username
    });

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile(formState).unwrap();
            setSuccessMessage("KYC submitted confirmed.");
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(
                error?.data?.message || "An error occurred. Please try again.",
            );
            setStatusType("error");
            setShowAlert(true);
        }
    };

    return (
        <div className="w-full space-y-6">
            <form onSubmit={handleOnSubmit} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Full Name Input */}
                        <FormControl fullWidth>
                            <FormInput
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                value={formState.fullName}
                                onChange={handleOnChange}
                            />
                        </FormControl>

                        {/* Username Input */}
                        <FormControl fullWidth>
                            <FormInput
                                id="username"
                                label="Username"
                                name="username"
                                value={formState.username}
                                onChange={handleOnChange}
                            />
                        </FormControl>

                        {/* Email Input (Disabled) */}
                        <FormControl fullWidth>
                            <FormInput
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleOnChange}
                            />
                        </FormControl>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Phone Number Input */}
                        <FormControl fullWidth>
                            <FormInput
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
                                type="tel"
                                value={formState.phoneNumber}
                                onChange={handleOnChange}
                            />
                        </FormControl>

                        {/* Passport Number Input */}
                        <FormControl fullWidth>
                            <FormInput
                                id="passportNumber"
                                label="Passport Number"
                                name="passportNumber"
                                value={formState.passportNumber}
                                onChange={handleOnChange}
                            />
                        </FormControl>

                        {/* Contact Address Input */}
                        <FormControl fullWidth>
                            <FormInput
                                id="contactAddress"
                                label="Contact Address"
                                name="contactAddress"
                                value={formState.contactAddress}
                                onChange={handleOnChange}
                            />
                        </FormControl>
                    </div>
                </div>{" "}
                {/* Submit Button */}
                <div className="mt-8">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#2D6A4F",
                            fontWeight: "bold",
                            padding: "12px 32px",
                            fontSize: "16px",
                            width: "100%",
                        }}
                        disabled={isLoading}
                    >
                        Submit KYC Verification
                    </Button>
                </div>
            </form>

            {/* Alerts */}
            <AlertMessage
                errorMessage={errorMessage}
                successMessage={successMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            <LoadingBackdrop open={isLoading} />
        </div>
    );
};

export default KYCForm;
