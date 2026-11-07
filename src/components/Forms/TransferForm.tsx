import React, { ChangeEvent, useState } from "react";
import { useTransferFundsMutation } from "../../features/user/api/userApiSlice.ts";
import { Button, FormControl, SelectChangeEvent } from "@mui/material";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import FormInput from "../common/FormInput.tsx";

interface FormState {
    receiverUsername: string;
    amount: string;
}

const TransferForm = () => {
    const [formState, setFormState] = useState<FormState>({
        receiverUsername: "",
        amount: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [transfer, { isLoading }] = useTransferFundsMutation();

    const handleOnChange = (
        e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await transfer(formState).unwrap();
            setSuccessMessage(
                "Transfer of ${formState.amount} to ${formState.receiverUsername} was successful",
            );
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(error?.data?.message);
            setShowAlert(true);
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800 font-medium">
                    ℹ️ You can only transfer funds from your balance.
                </p>
            </div>

            <form onSubmit={handleOnSubmit} className="w-full space-y-4">
                <FormControl fullWidth margin="normal">
                    <FormInput
                        id="receiverUsername"
                        label="Destination Account Username"
                        name="receiverUsername"
                        value={formState.receiverUsername}
                        onChange={handleOnChange}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormInput
                        id="amount"
                        label="Preferred Amount in USD"
                        name="amount"
                        value={formState.amount}
                        onChange={handleOnChange}
                    />
                </FormControl>

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
                    Send Transfer
                </Button>
            </form>

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

export default TransferForm;
