import baseApi from "../../../app/api/apiSlice";

const adminApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => "admin/users",
        }),
        getAllUserWallets: builder.query({
            query: () => "admin/wallets",
        }),
        updateUserProfit: builder.mutation({
            query: ({ username, amount, operationType, updateField }) => ({
                url: `admin/update-profit/${username}`,
                method: "PUT",
                body: { amount, operationType, updateField }, // Assuming you're sending the amount to update
            }),
        }),
        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                url: `admin/users/${userId}`,
                method: "DELETE",
            }),
        }),
        getTotalUsers: builder.query({
            query: () => "admin/total-users",
        }),
        // Add the new endpoints below
        suspendUserAccount: builder.mutation({
            query: ({ userId, reason }) => ({
                url: `admin/users/${userId}/suspend`,
                method: "PUT",
                body: { reason },
            }),
        }),
        activateUserAccount: builder.mutation({
            query: ({ userId }) => ({
                url: `admin/users/${userId}/activate`,
                method: "PUT",
            }),
        }),
        getUserSuspensionStatus: builder.query({
            query: (userId) => `admin/users/${userId}/suspension-status`,
        }),

        // Deposits
        getTotalDeposit: builder.query({
            query: () => "admin/total-deposit",
        }),
        getAllDeposits: builder.query({
            query: () => "admin/get-all-deposits",
            providesTags: ["Deposit"],
        }),
        getAllPendingDeposits: builder.query({
            query: () => "admin/get-all-pending-deposits",
        }),
        getAllApprovedDeposits: builder.query({
            query: () => "admin/get-all-approved-deposits",
        }),
        getAllRejectedDeposits: builder.query({
            query: () => "admin/get-all-rejected-deposits",
        }),
        handleDeposit: builder.mutation({
            query: ({ depositId, status }) => ({
                url: `admin/handle-deposit/${depositId}/${status}`,
                method: "PUT",
            }),
            invalidatesTags: ["Deposit"],
        }),

        // Withdrawals
        getTotalWithdrawal: builder.query({
            query: () => "admin/total-withdrawal",
        }),
        getAllWithdrawals: builder.query({
            query: () => "admin/get-all-withdrawals",
        }),
        getAllPendingWithdrawals: builder.query({
            query: () => "admin/get-all-pending-withdrawals",
        }),
        getAllApprovedWithdrawals: builder.query({
            query: () => "admin/get-all-approved-withdrawals",
        }),
        getAllRejectedWithdrawals: builder.query({
            query: () => "admin/get-all-rejected-withdrawals",
        }),
        handleWithdrawal: builder.mutation({
            query: ({ withdrawalId, status }) => ({
                url: `admin/handle-withdrawal/${withdrawalId}/${status}`,
                method: "PUT",
            }),
        }),

        // Plans
        getAllPlans: builder.query({
            query: () => "admin/plans/all",
        }),
        adminProfile: builder.query({
            query: () => ({
                url: `/user/profile`,
                method: "GET",
            }),
        }),
        registerAdmin: builder.mutation({
            query: (adminData) => ({
                url: `/auth/admin-register`,
                method: "POST",
                body: adminData,
            }),
        }),

        // Investment Management
        getAllInvestments: builder.query({
            query: (params = {}) => ({
                url: "admin/get-all-investment",
                params,
            }),
            providesTags: ["Investment"],
        }),
        getInvestmentById: builder.query({
            query: (id) => `admin/investments/${id}`,
        }),
        pauseInvestment: builder.mutation({
            query: ({ id, adminNotes }) => ({
                url: `admin/investments/${id}/pause`,
                method: "PUT",
                body: { adminNotes },
            }),
            invalidatesTags: ["Investment"],
        }),
        resumeInvestment: builder.mutation({
            query: ({ id, adminNotes }) => ({
                url: `admin/investments/${id}/resume`,
                method: "PUT",
                body: { adminNotes },
            }),
            invalidatesTags: ["Investment"],
        }),
        terminateInvestment: builder.mutation({
            query: ({ id, adminNotes, returnPrincipal }) => ({
                url: `admin/investments/${id}/terminate`,
                method: "PUT",
                body: { adminNotes, returnPrincipal },
            }),
            invalidatesTags: ["Investment"],
        }),
        completeInvestment: builder.mutation({
            query: ({ id, adminNotes, addFinalProfit }) => ({
                url: `admin/investments/${id}/complete`,
                method: "PUT",
                body: { adminNotes, addFinalProfit },
            }),
            invalidatesTags: ["Investment"],
        }),
        updateInvestmentProfit: builder.mutation({
            query: ({ id, profitAmount, adminNotes }) => ({
                url: `admin/investments/${id}/update-profit`,
                method: "PUT",
                body: { profitAmount, adminNotes },
            }),
            invalidatesTags: ["Investment"],
        }),
        deleteInvestment: builder.mutation({
            query: (id) => ({
                url: `admin/investments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Investment"],
        }),
        updateUserWallet: builder.mutation({
            query: ({
                userId,
                balanceAmount,
                profitAmount,
                referralBonusAmount,
                adminNotes,
            }) => ({
                url: `admin/users/${userId}/update-wallet`,
                method: "PUT",
                body: {
                    balanceAmount,
                    profitAmount,
                    referralBonusAmount,
                    adminNotes,
                },
            }),
        }),
        getInvestmentStats: builder.query({
            query: () => "admin/investment-stats",
        }),
    }),
});

// Export the hooks for each endpoint
export const {
    useGetAllUsersQuery,
    useGetAllUserWalletsQuery,
    useUpdateUserProfitMutation,
    useDeleteUserMutation,
    useGetTotalUsersQuery,
    useSuspendUserAccountMutation,
    useActivateUserAccountMutation,
    useGetUserSuspensionStatusQuery,

    useGetTotalDepositQuery,
    useGetAllDepositsQuery,
    useGetAllPendingDepositsQuery,
    useGetAllApprovedDepositsQuery,
    useGetAllRejectedDepositsQuery,
    useHandleDepositMutation,

    useGetTotalWithdrawalQuery,
    useGetAllWithdrawalsQuery,
    useGetAllPendingWithdrawalsQuery,
    useGetAllApprovedWithdrawalsQuery,
    useGetAllRejectedWithdrawalsQuery,
    useHandleWithdrawalMutation,

    useGetAllPlansQuery,

    useRegisterAdminMutation,
    useAdminProfileQuery,

    // Investment Management hooks
    useGetAllInvestmentsQuery,
    useGetInvestmentByIdQuery,
    usePauseInvestmentMutation,
    useResumeInvestmentMutation,
    useTerminateInvestmentMutation,
    useCompleteInvestmentMutation,
    useUpdateInvestmentProfitMutation,
    useDeleteInvestmentMutation,
    useUpdateUserWalletMutation,
    useGetInvestmentStatsQuery,
} = adminApiSlice;
