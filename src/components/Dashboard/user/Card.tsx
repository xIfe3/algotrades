const DashboardCard = ({ title, amount, icon }: any) => {
    // Define professional colors based on card type
    const getCardStyle = (title: string) => {
        switch (title.toLowerCase()) {
            case "account balance":
                return {
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    border: "border-blue-100",
                    accent: "bg-blue-500",
                };
            case "your deposit":
                return {
                    iconBg: "bg-green-50",
                    iconColor: "text-green-600",
                    border: "border-green-100",
                    accent: "bg-green-500",
                };
            case "your withdrawal":
                return {
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    border: "border-orange-100",
                    accent: "bg-orange-500",
                };
            case "accumulated interest/profit":
                return {
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    border: "border-purple-100",
                    accent: "bg-purple-500",
                };
            case "referral bonus":
                return {
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    border: "border-indigo-100",
                    accent: "bg-indigo-500",
                };
            default:
                return {
                    iconBg: "bg-gray-50",
                    iconColor: "text-gray-600",
                    border: "border-gray-100",
                    accent: "bg-gray-500",
                };
        }
    };

    const style = getCardStyle(title);

    return (
        <div
            className={`bg-white rounded-lg shadow-sm border ${style.border} overflow-hidden transition-all duration-200 active:scale-[0.98]`}
        >
            {/* Card Header with subtle accent */}
            <div className={`h-1 ${style.accent}`}></div>

            {/* Card Content */}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                            {title}
                        </h4>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-semibold text-gray-900">
                                ${amount}
                            </span>
                        </div>
                    </div>

                    {/* Icon */}
                    <div
                        className={`${style.iconBg} ${style.iconColor} p-3 rounded-lg flex-shrink-0`}
                    >
                        <div className="text-xl">{icon}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
