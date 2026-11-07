// CardList.js
import DashboardCard from "./Card";
import { GiWallet, GiProfit, GiPerson } from "react-icons/gi";
import { BsFillCloudDownloadFill, BsCloudUploadFill } from "react-icons/bs";
import formatAmount from "../../../config/format";

const CardList = ({
    balance,
    deposit,
    withdrawal,
    profit,
    referralBonus,
}: any) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                    Portfolio Overview
                </h2>
                <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <DashboardCard
                    title="Account Balance"
                    amount={formatAmount(balance)}
                    icon={<GiWallet />}
                />
                <DashboardCard
                    title="Your Deposit"
                    amount={formatAmount(deposit)}
                    icon={<BsFillCloudDownloadFill />}
                />
                <DashboardCard
                    title="Your Withdrawal"
                    amount={formatAmount(withdrawal)}
                    icon={<BsCloudUploadFill />}
                />
                <DashboardCard
                    title="Accumulated Interest/profit"
                    amount={formatAmount(profit)}
                    icon={<GiProfit />}
                />
                <DashboardCard
                    title="Referral Bonus"
                    amount={formatAmount(referralBonus)}
                    icon={<GiPerson />}
                />
            </div>
        </div>
    );
};

export default CardList;
