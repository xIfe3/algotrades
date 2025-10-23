import { PiHandDepositFill } from "react-icons/pi";
import { MdOutlinePending, MdDashboard } from "react-icons/md";
import { TiInputChecked } from "react-icons/ti";
import { FcCancel } from "react-icons/fc";
import { IoWallet } from "react-icons/io5";
import { PiHandWithdrawFill } from "react-icons/pi";
import { GoMultiSelect } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { IoClose } from "react-icons/io5";
import { GiProfit } from "react-icons/gi";
import { FaUsers, FaChartBar, FaMoneyBillWave, FaCog } from "react-icons/fa";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { useState } from "react";

// Import hooks for counts
import {
    useGetAllPendingDepositsQuery,
    useGetAllPendingWithdrawalsQuery,
} from "../../features/admin/api/adminApiSlice";

const AdminSidebar = ({ isOpen, toggleSidebar }: any) => {
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState({
        deposits: true,
        withdrawals: true,
    });

    // Fetch pending deposit and withdrawal counts
    const { data: pendingDeposits, isLoading: loadingDeposits } =
        useGetAllPendingDepositsQuery({});

    const { data: pendingWithdrawals, isLoading: loadingWithdrawals } =
        useGetAllPendingWithdrawalsQuery({});

    if (loadingDeposits || loadingWithdrawals) {
        return (
            <div className="fixed w-[280px] h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-50">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                </div>
            </div>
        );
    }

    const pendingDepositsCount = pendingDeposits?.deposits?.length || 0;
    const pendingWithdrawalsCount =
        pendingWithdrawals?.withdrawals?.length || 0;

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev],
        }));
    };

    const isActive = (path: string) => location.pathname === path;

    const NavItem = ({
        to,
        icon: Icon,
        children,
        badge,
        isSubmenu = false,
    }: any) => (
        <Link
            to={to}
            className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(to)
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : isSubmenu
                      ? "text-slate-300 ml-6 hover:bg-slate-700/50 hover:text-white"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
            }`}
        >
            <div className="flex items-center">
                <Icon
                    className={`w-5 h-5 mr-3 ${
                        isActive(to)
                            ? "text-white"
                            : "text-slate-400 group-hover:text-white"
                    }`}
                />
                <span>{children}</span>
            </div>
            {badge && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {badge}
                </span>
            )}
        </Link>
    );

    const SectionHeader = ({
        icon: Icon,
        title,
        expanded,
        onToggle,
        count,
    }: any) => (
        <button
            onClick={onToggle}
            className="w-full group flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-200 hover:text-white transition-colors duration-200"
        >
            <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3 text-slate-400" />
                <span>{title}</span>
                {count > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full">
                        {count}
                    </span>
                )}
            </div>
            {expanded ? (
                <HiChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
                <HiChevronRight className="w-4 h-4 text-slate-400" />
            )}
        </button>
    );

    return (
        <div
            className={`fixed w-[280px] h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-transform transform shadow-2xl ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 sm:block z-50`}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <img
                            src={Logo}
                            alt="AlgoTrades"
                            className="w-6 h-6 text-white"
                        />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">
                            AlgoTrades
                        </h1>
                        <p className="text-xs text-slate-400">Admin Panel</p>
                    </div>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
                >
                    <IoClose className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
                {/* Main Dashboard */}
                <NavItem to="/admin" icon={MdDashboard}>
                    Dashboard
                </NavItem>

                <div className="pt-4">
                    <div className="px-4 pb-2">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Management
                        </h3>
                    </div>
                    <NavItem to="/admin/users" icon={FaUsers}>
                        Users
                    </NavItem>
                    <NavItem to="/admin/investments" icon={GiProfit}>
                        Investments
                    </NavItem>
                    <NavItem to="/admin/wallets" icon={IoWallet}>
                        Wallets
                    </NavItem>
                    <NavItem to="/admin/plans" icon={GoMultiSelect}>
                        Trading Plans
                    </NavItem>
                </div>

                {/* Deposits Section */}
                <div className="pt-4">
                    <SectionHeader
                        icon={PiHandDepositFill}
                        title="Deposits"
                        expanded={expandedSections.deposits}
                        onToggle={() => toggleSection("deposits")}
                        count={pendingDepositsCount}
                    />
                    {expandedSections.deposits && (
                        <div className="space-y-1 mt-1">
                            <NavItem
                                to="/admin/deposits/all"
                                icon={FaChartBar}
                                isSubmenu
                            >
                                All Deposits
                            </NavItem>
                            <NavItem
                                to="/admin/deposits/pending"
                                icon={MdOutlinePending}
                                badge={
                                    pendingDepositsCount > 0
                                        ? pendingDepositsCount
                                        : null
                                }
                                isSubmenu
                            >
                                Pending
                            </NavItem>
                            <NavItem
                                to="/admin/deposits/approved"
                                icon={TiInputChecked}
                                isSubmenu
                            >
                                Approved
                            </NavItem>
                            <NavItem
                                to="/admin/deposits/declined"
                                icon={FcCancel}
                                isSubmenu
                            >
                                Declined
                            </NavItem>
                        </div>
                    )}
                </div>

                {/* Withdrawals Section */}
                <div>
                    <SectionHeader
                        icon={PiHandWithdrawFill}
                        title="Withdrawals"
                        expanded={expandedSections.withdrawals}
                        onToggle={() => toggleSection("withdrawals")}
                        count={pendingWithdrawalsCount}
                    />
                    {expandedSections.withdrawals && (
                        <div className="space-y-1 mt-1">
                            <NavItem
                                to="/admin/withdrawals/all"
                                icon={FaMoneyBillWave}
                                isSubmenu
                            >
                                All Withdrawals
                            </NavItem>
                            <NavItem
                                to="/admin/withdrawals/pending"
                                icon={MdOutlinePending}
                                badge={
                                    pendingWithdrawalsCount > 0
                                        ? pendingWithdrawalsCount
                                        : null
                                }
                                isSubmenu
                            >
                                Pending
                            </NavItem>
                            <NavItem
                                to="/admin/withdrawals/approved"
                                icon={TiInputChecked}
                                isSubmenu
                            >
                                Approved
                            </NavItem>
                            <NavItem
                                to="/admin/withdrawals/declined"
                                icon={FcCancel}
                                isSubmenu
                            >
                                Declined
                            </NavItem>
                        </div>
                    )}
                </div>

                {/* Settings */}
                <div className="pt-6 border-t border-slate-700 mt-6">
                    <NavItem to="/admin/settings" icon={FaCog}>
                        Settings
                    </NavItem>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
                <div className="text-center">
                    <p className="text-xs text-slate-500">© 2025 AlgoTrades</p>
                    <p className="text-xs text-slate-600">v2.1.0</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
