interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: "blue" | "green" | "purple" | "orange" | "red";
}

const StatCard = ({ title, value, icon, color = "blue" }: StatCardProps) => {
    const colorVariants = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        green: "bg-green-50 text-green-600 border-green-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        orange: "bg-orange-50 text-orange-600 border-orange-100",
        red: "bg-red-50 text-red-600 border-red-100",
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {title}
                    </h3>
                    <span className="text-2xl font-bold text-gray-900">
                        {value}
                    </span>
                </div>
                {icon && (
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colorVariants[color]}`}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
