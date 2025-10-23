import React, { ChangeEvent, useState, useEffect } from "react";
import {
    useReinvestMutation,
    useGetAllUserPlansQuery,
} from "../../features/user/api/userApiSlice.ts";
import { Button, FormControl, SelectChangeEvent } from "@mui/material";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import FormSelect from "../common/FormSelect.tsx";
import FormInput from "../common/FormInput.tsx";
import { useGetUserWalletQuery } from "../../features/user/api/userApiSlice.ts";
import formatAmount from "../../config/format.ts";

interface FormState {
    source: string;
    plan: string;
    amount: number;
}

const ReinvestForm = () => {
    const [formState, setFormState] = useState<FormState>({
        source: "",
        plan: "",
        amount: 0,
    });
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [plansData, setPlansData] = useState<
        { value: string; title: string; amount: number }[]
    >([]);

    const { data: walletData, isLoading: isWalletLoading } =
        useGetUserWalletQuery({});

    const wallet = walletData?.wallet;
    console.log(wallet);

    const { data: plans = {} } = useGetAllUserPlansQuery({});
    const [reinvest, { isLoading: isReinvestLoading }] = useReinvestMutation();

    useEffect(() => {
        // Populate plansData with initial investment amounts
        const formattedPlans = (plans.plans || []).map((plan: any) => ({
            value: plan._id,
            title: `Invest $${formatAmount(plan.initialInvestment)} Get $${formatAmount(plan.profit)} (Duration ${plan.duration} ${plan.durationType})`,
            amount: plan.initialInvestment, // Add the initial investment amount
        }));
        setPlansData(formattedPlans);
    }, [plans]);

    // Update amount based on the selected plan
    useEffect(() => {
        const selectedPlan = plansData.find(
            (plan) => plan.value === formState.plan,
        );
        if (selectedPlan) {
            setFormState((prevState) => ({
                ...prevState,
                amount: selectedPlan.amount, // Set amount to the selected plan's initial investment
            }));
        } else {
            setFormState((prevState) => ({
                ...prevState,
                amount: 0, // Reset amount if no plan is selected
            }));
        }
    }, [formState.plan, plansData]);

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
            await reinvest(formState).unwrap();
            setSuccessMessage(
                `You have successfully reinvested $${formatAmount(formState.amount)}`,
            );
            setStatusType("success");
            setShowAlert(true);
            setFormState({ source: "", plan: "", amount: 0 });
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error?.data?.message);
            setShowAlert(true);
        }
    };

    if (isWalletLoading) return <p>Loading....</p>;

    return (
        <div className="w-full space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800 font-medium">
                    ℹ️ Reinvestments are quick deposits made from your account
                    balance to renew your contract.
                </p>
            </div>

            <form onSubmit={handleOnSubmit} className="w-full space-y-4">
                <FormControl fullWidth margin="normal">
                    <FormSelect
                        label="source"
                        title="Source"
                        value={formState.source}
                        handleOnChange={handleOnChange}
                        menuItems={[
                            {
                                value: "balance",
                                title: `Reinvest from my balance ($${formatAmount(wallet?.balance)})`,
                            },
                        ]}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <FormSelect
                        label="plan"
                        title="Select Plan"
                        value={formState.plan}
                        handleOnChange={handleOnChange}
                        menuItems={plansData}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormInput
                        id="amount"
                        label="Amount"
                        name="amount"
                        value={`$${formatAmount(formState.amount)}`}
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
                    disabled={isReinvestLoading}
                >
                    Reinvest Now
                </Button>
            </form>

            <AlertMessage
                errorMessage={errorMessage}
                successMessage={successMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            <LoadingBackdrop open={isReinvestLoading} />
        </div>
    );
};

export default ReinvestForm;
