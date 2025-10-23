import { useState, useEffect } from "react";
import AdminSidebar from "../shared/admin/Sidebar";
import { NavBar } from "../shared/admin/Navbar";
import { Outlet } from "react-router-dom";
import { useAdminProfileQuery } from "../features/admin/api/adminApiSlice";
import { Component as UpdateProfitDrawer } from "../components/Admin/UpdateProfit";
import { useLocation } from "react-router-dom";

const AdminLayout = () => {
    // State for the sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // State for the drawer (UpdateProfit component)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [currentPath, setCurrentPath] = useState("");

    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === currentPath) return;
        else {
            setCurrentPath(pathname);
            setIsSidebarOpen(false);
        }
    }, [pathname]);

    const { data } = useAdminProfileQuery(undefined);
    const profileData = data?.user || {};

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div className="flex-1 flex flex-col w-[75%] sm:ml-[280px] transition-all duration-300">
                {/* Navbar */}
                <NavBar
                    toggleSidebar={toggleSidebar}
                    profileData={profileData}
                />

                <div className="flex-1 px-6 py-8 bg-gray-50 min-h-screen">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Admin Dashboard
                                </h1>
                                <p className="text-gray-600">
                                    Manage your platform efficiently
                                </p>
                            </div>
                            <button
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-200 transform active:scale-95"
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                Update User Balance / Profit
                            </button>
                        </div>
                    </div>

                    {/* Drawer component */}
                    <UpdateProfitDrawer
                        isOpen={isDrawerOpen}
                        setIsOpen={setIsDrawerOpen}
                    />

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
