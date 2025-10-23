import { RiRefreshLine } from "react-icons/ri";

interface RefetchButtonProps {
    refetch: () => void;
    isLoading?: boolean;
}

const RefetchButton = ({ refetch, isLoading = false }: RefetchButtonProps) => {
    return (
        <button
            onClick={refetch}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:bg-gray-50"
        >
            <RiRefreshLine
                className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? "Refreshing..." : "Refresh Data"}
        </button>
    );
};

export default RefetchButton;
