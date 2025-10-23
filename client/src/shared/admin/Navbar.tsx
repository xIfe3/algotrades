import { Avatar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/slices/authSlice";
import { AppDispatch } from "../../app/store";
import { FaBars } from "react-icons/fa";

export function NavBar({ profileData, toggleSidebar }: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/auth/admin/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-600 text-xl sm:hidden p-2 rounded-lg transition-colors duration-200 active:bg-gray-100"
                    >
                        <FaBars />
                    </button>
                    <div className="hidden sm:block">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Welcome back, Admin
                        </h2>
                        <p className="text-sm text-gray-500">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <div className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 active:bg-gray-50">
                                <Avatar
                                    alt="User settings"
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded
                                    size="sm"
                                />
                                <div className="hidden md:block text-left">
                                    <div className="text-sm font-medium text-gray-900">
                                        {profileData.fullName || "Admin"}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Administrator
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm font-medium">
                                {profileData.fullName}
                            </span>
                            <span className="block truncate text-sm text-gray-500">
                                {profileData.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item as={Link} to="/admin/">
                            Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/settings">
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/">
                            View Site
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                            onClick={handleLogout}
                            className="text-red-600"
                        >
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
}
