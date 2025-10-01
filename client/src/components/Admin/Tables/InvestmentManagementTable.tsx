import React, { useState } from "react";
import {
    Table,
    Button,
    Modal,
    TextInput,
    Textarea,
    Label,
    Badge,
} from "flowbite-react";
import {
    FaPlay,
    FaPause,
    FaStop,
    FaCheck,
    FaEdit,
    FaTrash,
    FaEye,
} from "react-icons/fa";
import formatAmount from "../../../config/format";
import {
    usePauseInvestmentMutation,
    useResumeInvestmentMutation,
    useTerminateInvestmentMutation,
    useCompleteInvestmentMutation,
    useUpdateInvestmentProfitMutation,
    useDeleteInvestmentMutation,
} from "../../../features/admin/api/adminApiSlice";

interface Investment {
    _id: string;
    user: {
        _id: string;
        fullName: string;
        email: string;
        username: string;
    };
    plan: {
        planId: string;
        planName: string;
    };
    amount: number;
    startDate: string;
    endDate: string;
    status: "active" | "completed" | "paused" | "terminated";
    profitAccumulated: number;
    adminNotes?: string;
    pausedAt?: string;
    resumedAt?: string;
    terminatedAt?: string;
}

interface InvestmentManagementTableProps {
    investments: Investment[];
    refetch: () => void;
}

const InvestmentManagementTable: React.FC<InvestmentManagementTableProps> = ({
    investments,
    refetch,
}) => {
    const [selectedInvestment, setSelectedInvestment] =
        useState<Investment | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<
        "pause" | "resume" | "terminate" | "complete" | "edit-profit" | "view"
    >("view");
    const [adminNotes, setAdminNotes] = useState("");
    const [profitAmount, setProfitAmount] = useState("");
    const [returnPrincipal, setReturnPrincipal] = useState(false);
    const [addFinalProfit, setAddFinalProfit] = useState("");

    const [pauseInvestment] = usePauseInvestmentMutation();
    const [resumeInvestment] = useResumeInvestmentMutation();
    const [terminateInvestment] = useTerminateInvestmentMutation();
    const [completeInvestment] = useCompleteInvestmentMutation();
    const [updateInvestmentProfit] = useUpdateInvestmentProfitMutation();
    const [deleteInvestment] = useDeleteInvestmentMutation();

    const openModal = (investment: Investment, type: typeof modalType) => {
        setSelectedInvestment(investment);
        setModalType(type);
        setShowModal(true);
        setAdminNotes("");
        setProfitAmount("");
        setAddFinalProfit("");
        setReturnPrincipal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedInvestment(null);
        setAdminNotes("");
        setProfitAmount("");
        setAddFinalProfit("");
        setReturnPrincipal(false);
    };

    const handleAction = async () => {
        if (!selectedInvestment) return;

        try {
            switch (modalType) {
                case "pause":
                    await pauseInvestment({
                        id: selectedInvestment._id,
                        adminNotes,
                    }).unwrap();
                    break;
                case "resume":
                    await resumeInvestment({
                        id: selectedInvestment._id,
                        adminNotes,
                    }).unwrap();
                    break;
                case "terminate":
                    await terminateInvestment({
                        id: selectedInvestment._id,
                        adminNotes,
                        returnPrincipal,
                    }).unwrap();
                    break;
                case "complete":
                    await completeInvestment({
                        id: selectedInvestment._id,
                        adminNotes,
                        addFinalProfit: parseFloat(addFinalProfit) || 0,
                    }).unwrap();
                    break;
                case "edit-profit":
                    await updateInvestmentProfit({
                        id: selectedInvestment._id,
                        profitAmount: parseFloat(profitAmount),
                        adminNotes,
                    }).unwrap();
                    break;
            }
            refetch();
            closeModal();
        } catch (error) {
            console.error("Action failed:", error);
        }
    };

    const handleDelete = async (investmentId: string) => {
        if (
            window.confirm("Are you sure you want to delete this investment?")
        ) {
            try {
                await deleteInvestment(investmentId).unwrap();
                refetch();
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const getStatusBadge = (status: string) => {
        const colors = {
            active: "success",
            completed: "info",
            paused: "warning",
            terminated: "failure",
        };
        return (
            <Badge color={colors[status as keyof typeof colors]}>
                {status.toUpperCase()}
            </Badge>
        );
    };

    const getActionButtons = (investment: Investment) => {
        const buttons = [];

        // View button
        buttons.push(
            <Button
                key="view"
                size="xs"
                color="gray"
                onClick={() => openModal(investment, "view")}
            >
                <FaEye />
            </Button>,
        );

        // Status-specific buttons
        if (investment.status === "active") {
            buttons.push(
                <Button
                    key="pause"
                    size="xs"
                    color="warning"
                    onClick={() => openModal(investment, "pause")}
                >
                    <FaPause />
                </Button>,
            );
            buttons.push(
                <Button
                    key="complete"
                    size="xs"
                    color="success"
                    onClick={() => openModal(investment, "complete")}
                >
                    <FaCheck />
                </Button>,
            );
        }

        if (investment.status === "paused") {
            buttons.push(
                <Button
                    key="resume"
                    size="xs"
                    color="success"
                    onClick={() => openModal(investment, "resume")}
                >
                    <FaPlay />
                </Button>,
            );
        }

        if (["active", "paused"].includes(investment.status)) {
            buttons.push(
                <Button
                    key="terminate"
                    size="xs"
                    color="failure"
                    onClick={() => openModal(investment, "terminate")}
                >
                    <FaStop />
                </Button>,
            );
            buttons.push(
                <Button
                    key="edit-profit"
                    size="xs"
                    color="blue"
                    onClick={() => openModal(investment, "edit-profit")}
                >
                    <FaEdit />
                </Button>,
            );
        }

        // Delete button (always available)
        buttons.push(
            <Button
                key="delete"
                size="xs"
                color="failure"
                onClick={() => handleDelete(investment._id)}
            >
                <FaTrash />
            </Button>,
        );

        return buttons;
    };

    const renderModalContent = () => {
        if (!selectedInvestment) return null;

        switch (modalType) {
            case "view":
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>User</Label>
                                <p className="font-medium">
                                    {selectedInvestment.user.fullName ||
                                        selectedInvestment.user.username}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {selectedInvestment.user.email}
                                </p>
                            </div>
                            <div>
                                <Label>Plan</Label>
                                <p className="font-medium">
                                    {selectedInvestment.plan.planName}
                                </p>
                            </div>
                            <div>
                                <Label>Amount</Label>
                                <p className="font-medium">
                                    ${formatAmount(selectedInvestment.amount)}
                                </p>
                            </div>
                            <div>
                                <Label>Status</Label>
                                {getStatusBadge(selectedInvestment.status)}
                            </div>
                            <div>
                                <Label>Start Date</Label>
                                <p>
                                    {new Date(
                                        selectedInvestment.startDate,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <Label>End Date</Label>
                                <p>
                                    {new Date(
                                        selectedInvestment.endDate,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <Label>Profit Accumulated</Label>
                                <p className="font-medium text-green-600">
                                    $
                                    {formatAmount(
                                        selectedInvestment.profitAccumulated,
                                    )}
                                </p>
                            </div>
                        </div>
                        {selectedInvestment.adminNotes && (
                            <div>
                                <Label>Admin Notes</Label>
                                <p className="text-sm bg-gray-100 p-2 rounded">
                                    {selectedInvestment.adminNotes}
                                </p>
                            </div>
                        )}
                    </div>
                );

            case "pause":
            case "resume":
                return (
                    <div className="space-y-4">
                        <p>
                            Are you sure you want to {modalType} this investment
                            for{" "}
                            <strong>
                                {selectedInvestment.user.fullName ||
                                    selectedInvestment.user.username}
                            </strong>
                            ?
                        </p>
                        <div>
                            <Label htmlFor="adminNotes">
                                Admin Notes (Optional)
                            </Label>
                            <Textarea
                                id="adminNotes"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Add a note about this action..."
                            />
                        </div>
                    </div>
                );

            case "terminate":
                return (
                    <div className="space-y-4">
                        <p className="text-red-600 font-medium">
                            Are you sure you want to terminate this investment
                            for{" "}
                            <strong>
                                {selectedInvestment.user.fullName ||
                                    selectedInvestment.user.username}
                            </strong>
                            ?
                        </p>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="returnPrincipal"
                                checked={returnPrincipal}
                                onChange={(e) =>
                                    setReturnPrincipal(e.target.checked)
                                }
                            />
                            <Label htmlFor="returnPrincipal">
                                Return principal amount to user's wallet
                            </Label>
                        </div>
                        <div>
                            <Label htmlFor="adminNotes">Admin Notes</Label>
                            <Textarea
                                id="adminNotes"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Reason for termination..."
                                required
                            />
                        </div>
                    </div>
                );

            case "complete":
                return (
                    <div className="space-y-4">
                        <p>
                            Complete this investment for{" "}
                            <strong>
                                {selectedInvestment.user.fullName ||
                                    selectedInvestment.user.username}
                            </strong>
                            ?
                        </p>
                        <div>
                            <Label htmlFor="addFinalProfit">
                                Additional Final Profit ($)
                            </Label>
                            <TextInput
                                id="addFinalProfit"
                                type="number"
                                step="0.01"
                                value={addFinalProfit}
                                onChange={(e) =>
                                    setAddFinalProfit(e.target.value)
                                }
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <Label htmlFor="adminNotes">
                                Admin Notes (Optional)
                            </Label>
                            <Textarea
                                id="adminNotes"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Completion notes..."
                            />
                        </div>
                    </div>
                );

            case "edit-profit":
                return (
                    <div className="space-y-4">
                        <p>
                            Add profit to investment for{" "}
                            <strong>
                                {selectedInvestment.user.fullName ||
                                    selectedInvestment.user.username}
                            </strong>
                        </p>
                        <div>
                            <Label htmlFor="profitAmount">
                                Profit Amount ($)
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
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="adminNotes">
                                Admin Notes (Optional)
                            </Label>
                            <Textarea
                                id="adminNotes"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Reason for profit adjustment..."
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>User</Table.HeadCell>
                        <Table.HeadCell>Plan</Table.HeadCell>
                        <Table.HeadCell>Amount</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Start Date</Table.HeadCell>
                        <Table.HeadCell>End Date</Table.HeadCell>
                        <Table.HeadCell>Profit</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {investments.map((investment) => (
                            <Table.Row
                                key={investment._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {investment.user.fullName ||
                                                investment.user.username}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            @{investment.user.username}
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    {investment.plan.planName}
                                </Table.Cell>
                                <Table.Cell>
                                    ${formatAmount(investment.amount)}
                                </Table.Cell>
                                <Table.Cell>
                                    {getStatusBadge(investment.status)}
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(
                                        investment.startDate,
                                    ).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(
                                        investment.endDate,
                                    ).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="text-green-600 font-medium">
                                        $
                                        {formatAmount(
                                            investment.profitAccumulated,
                                        )}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex space-x-1">
                                        {getActionButtons(investment)}
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                {investments.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No investments found</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal show={showModal} onClose={closeModal}>
                <Modal.Header>
                    {modalType === "view"
                        ? "Investment Details"
                        : `${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Investment`}
                </Modal.Header>
                <Modal.Body>{renderModalContent()}</Modal.Body>
                {modalType !== "view" && (
                    <Modal.Footer>
                        <Button onClick={handleAction} color="blue">
                            Confirm
                        </Button>
                        <Button onClick={closeModal} color="gray">
                            Cancel
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
};

export default InvestmentManagementTable;
