import { Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ dashboardUrl, currentPage }: any) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav
                className="flex items-center space-x-3"
                aria-label="Breadcrumb"
            >
                <Link
                    to={dashboardUrl || "/dashboard/me"}
                    className="flex items-center space-x-2 text-blue-600 font-medium transition-colors duration-200 active:text-blue-700"
                >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaHome className="text-blue-600 text-sm" />
                    </div>
                    <span>Dashboard</span>
                </Link>

                <FaChevronRight className="text-gray-400 text-sm" />

                <span className="text-gray-700 font-medium">{currentPage}</span>
            </nav>
        </div>
    );
}
