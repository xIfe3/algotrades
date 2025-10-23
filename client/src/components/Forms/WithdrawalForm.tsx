import React, { useState } from "react";
import {
    useHandleUserWithdrawalMutation,
    useHandleTransferProfitToBalanceMutation,
    useGetUserWalletQuery,
} from "../../features/user/api/userApiSlice";
import { Button, FormControl } from "@mui/material";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import FormSelect from "../common/FormSelect.tsx";
import FormInput from "../common/FormInput.tsx";
import formatAmount from "../../config/format.ts";

const WithdrawalForm = () => {
    const [formState, setFormState] = useState({
        currency: "",
        source: "",
        amount: "",
        walletAddress: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [statusType, setStatusType] = useState<"error" | "success" | "info">(
        "error",
    );
    const [showAlert, setShowAlert] = useState(false);

    const { data: walletData, isLoading: isWalletLoading } =
        useGetUserWalletQuery({});

    const [withdraw, { isLoading: isWithdrawLoading }] =
        useHandleUserWithdrawalMutation();

    const [transferProfitToBalance, { isLoading: isTransferLoading }] =
        useHandleTransferProfitToBalanceMutation();

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
            const response = await withdraw(formState).unwrap();
            console.log(response);
            setSuccessMessage(
                "Withdrawal request received! Our team is reviewing it, and you'll be notified once it's approved.",
            );
            setStatusType("info");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(error?.data?.message || "An error occurred");
            setShowAlert(true);
        }
    };

    const handleTransferProfitToBalance = async () => {
        try {
            const response = await transferProfitToBalance({}).unwrap();
            console.log(response);
            setSuccessMessage("Profit transferred to main balance!");
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(error?.data?.message || "An error occurred");
            setShowAlert(true);
        }
    };

    if (isWalletLoading) return <p>Loading...</p>;

    const wallet = walletData?.wallet;

    return (
        <div className="w-full space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 font-medium">
                    ℹ️ Withdrawals via USDT are automated. This is a
                    blockchain-based transaction and expected to be completed
                    within 10 minutes.
                </p>
            </div>

            <form onSubmit={handleOnSubmit} className="w-full space-y-4">
                <FormControl fullWidth margin="normal">
                    <FormSelect
                        label="currency"
                        title="Select preferred currency"
                        value={formState.currency}
                        handleOnChange={handleOnChange}
                        menuItems={[
                            {
                                value: "USD Tether TRC20 (USDTTRC20)",
                                title: "USD Tether TRC20 (USDTTRC20)",
                            },
                            {
                                value: "USD Tether ERC20 (USDTERC20)",
                                title: "USD Tether ERC20 (USDTERC20)",
                            },
                            {
                                value: "BTC Bitcoin",
                                title: "BTC Bitcoin",
                            },
                        ]}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormSelect
                        label="source"
                        title="Select withdrawal source"
                        value={formState.source}
                        handleOnChange={handleOnChange}
                        menuItems={[
                            {
                                value: "balance",
                                title: `Withdraw from balance ($${formatAmount(wallet.balance)})`,
                            },
                            {
                                value: "referralBonus",
                                title: `Withdraw from referral bonus ($${formatAmount(wallet.referralBonus)})`,
                            },
                        ]}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormInput
                        id="walletAddress"
                        label="Wallet Address"
                        name="walletAddress"
                        value={formState.walletAddress}
                        onChange={handleOnChange}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormInput
                        id="amount"
                        label="Amount"
                        name="amount"
                        value={formState.amount}
                        onChange={handleOnChange}
                    />
                </FormControl>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#2D6A4F",
                            fontWeight: "bold",
                            padding: "12px 32px",
                            fontSize: "16px",
                            flex: 1,
                        }}
                        disabled={isWithdrawLoading}
                    >
                        Withdraw
                    </Button>

                    <Button
                        onClick={handleTransferProfitToBalance}
                        variant="outlined"
                        sx={{
                            fontWeight: "bold",
                            padding: "12px 32px",
                            fontSize: "16px",
                            flex: 1,
                        }}
                        disabled={isTransferLoading}
                    >
                        Transfer Profit to Balance
                    </Button>
                </div>
            </form>

            <AlertMessage
                errorMessage={errorMessage}
                successMessage={successMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            <LoadingBackdrop open={isWithdrawLoading || isTransferLoading} />
        </div>
    );
};

export default WithdrawalForm;
