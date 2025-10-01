import React, { useState } from "react";
import { Modal, Button, TextInput, Label, Textarea } from "flowbite-react";
import { useUpdateUserWalletMutation } from "../../features/admin/api/adminApiSlice";
import formatAmount from "../../config/format";

interface Wallet {
    _id: string;
    user: {
        userId: string;
        fullName: string;
        email: string;
        username: string;
    };
    balance: number;
    profit: number;
    referralBonus: number;
}

interface WalletUpdateModalProps {
    wallet: Wallet | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const WalletUpdateModal: React.FC<WalletUpdateModalProps> = ({
    wallet,
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [balanceAmount, setBalanceAmount] = useState("");
    const [profitAmount, setProfitAmount] = useState("");
    const [referralBonusAmount, setReferralBonusAmount] = useState("");
    const [adminNotes, setAdminNotes] = useState("");

    const [updateUserWallet, { isLoading }] = useUpdateUserWalletMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!wallet) return;

        try {
            await updateUserWallet({
                userId: wallet.user.userId,
                balanceAmount: parseFloat(balanceAmount) || undefined,
                profitAmount: parseFloat(profitAmount) || undefined,
                referralBonusAmount:
                    parseFloat(referralBonusAmount) || undefined,
                adminNotes,
            }).unwrap();

            // Reset form
            setBalanceAmount("");
            setProfitAmount("");
            setReferralBonusAmount("");
            setAdminNotes("");

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Wallet update failed:", error);
        }
    };

    if (!wallet) return null;

    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>Update Wallet - {wallet.user.fullName}</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Current Wallet Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                            Current Wallet Balance
                        </h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Balance:</span>
                                <p className="font-medium">
                                    ${formatAmount(wallet.balance)}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-600">Profit:</span>
                                <p className="font-medium text-green-600">
                                    ${formatAmount(wallet.profit)}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-600">
                                    Referral Bonus:
                                </span>
                                <p className="font-medium text-blue-600">
                                    ${formatAmount(wallet.referralBonus)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Update Form */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="balanceAmount">
                                Balance Adjustment ($)
                            </Label>
                            <TextInput
                                id="balanceAmount"
                                type="number"
                                step="0.01"
                                value={balanceAmount}
                                onChange={(e) =>
                                    setBalanceAmount(e.target.value)
                                }
                                placeholder="0.00"
                                helperText="Positive to add, negative to subtract"
                            />
                        </div>
                        <div>
                            <Label htmlFor="profitAmount">
                                Profit Adjustment ($)
                            </Label>
                            <TextInput
                                id="profitAmount"
                                type="number"
                                step="0.01"
                                value={profitAmount}
                                onChange={(e) =>
                                    setProfitAmount(e.target.value)
                                }
                                placeholder="0.00"
                                helperText="Positive to add, negative to subtract"
                            />
                        </div>
                        <div>
                            <Label htmlFor="referralBonusAmount">
                                Referral Bonus Adjustment ($)
                            </Label>
                            <TextInput
                                id="referralBonusAmount"
                                type="number"
                                step="0.01"
                                value={referralBonusAmount}
                                onChange={(e) =>
                                    setReferralBonusAmount(e.target.value)
                                }
                                placeholder="0.00"
                                helperText="Positive to add, negative to subtract"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="adminNotes">Admin Notes</Label>
                        <Textarea
                            id="adminNotes"
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            placeholder="Reason for wallet adjustment..."
                            rows={3}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    color="blue"
                >
                    {isLoading ? "Updating..." : "Update Wallet"}
                </Button>
                <Button onClick={onClose} color="gray">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WalletUpdateModal;
