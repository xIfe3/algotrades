import React, { useState } from "react";
import {
    FaUser,
    FaLock,
    FaBell,
    FaCog,
    FaShieldAlt,
    FaChartLine,
    FaDatabase,
    FaEnvelope,
    FaPhone,
    FaSave,
    FaEdit,
    FaTimes,
} from "react-icons/fa";
import { useAdminProfileQuery } from "../api/adminApiSlice";

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [editing, setEditing] = useState(false);
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        weeklyReports: true,
        securityAlerts: true,
    });

    const [profile, setProfile] = useState({
        fullName: "Admin User",
        email: "admin@algotrades.com",
        phone: "+1 (555) 123-4567",
        role: "Super Administrator",
        department: "IT Administration",
        lastLogin: new Date().toISOString(),
    });

    const [security, setSecurity] = useState({
        twoFactorEnabled: true,
        sessionTimeout: 30,
        passwordExpiry: 90,
        loginAttempts: 5,
    });

    const [systemSettings, setSystemSettings] = useState({
        maintenanceMode: false,
        autoBackup: true,
        backupFrequency: "daily",
        maxUploadSize: 10,
        sessionDuration: 60,
    });

    const { isLoading } = useAdminProfileQuery(undefined);

    const tabs = [
        { id: "profile", label: "Profile", icon: FaUser },
        { id: "security", label: "Security", icon: FaShieldAlt },
        { id: "notifications", label: "Notifications", icon: FaBell },
        { id: "system", label: "System", icon: FaCog },
        { id: "analytics", label: "Analytics", icon: FaChartLine },
    ];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section: string,
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        if (section === "profile") {
            setProfile((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        } else if (section === "notifications") {
            setNotifications((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        } else if (section === "security") {
            setSecurity((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        } else if (section === "system") {
            setSystemSettings((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSave = () => {
        setEditing(false);
        // Add API call to save settings
        console.log("Saving settings...", {
            profile,
            notifications,
            security,
            systemSettings,
        });
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="space-y-6">
                        {/* Profile Header */}
                        <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {profile.fullName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {profile.fullName}
                                </h2>
                                <p className="text-lg text-blue-600 font-medium">
                                    {profile.role}
                                </p>
                                <p className="text-gray-600">
                                    {profile.department}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Last login:{" "}
                                    {new Date(
                                        profile.lastLogin,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaUser className="inline mr-2" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={profile.fullName}
                                        onChange={(e) =>
                                            handleInputChange(e, "profile")
                                        }
                                        disabled={!editing}
                                        className={`w-full px-4 py-3 rounded-lg border transition-all ${
                                            editing
                                                ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                : "border-gray-200 bg-gray-50 cursor-not-allowed"
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaEnvelope className="inline mr-2" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={(e) =>
                                            handleInputChange(e, "profile")
                                        }
                                        disabled={!editing}
                                        className={`w-full px-4 py-3 rounded-lg border transition-all ${
                                            editing
                                                ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                : "border-gray-200 bg-gray-50 cursor-not-allowed"
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaPhone className="inline mr-2" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={(e) =>
                                            handleInputChange(e, "profile")
                                        }
                                        disabled={!editing}
                                        className={`w-full px-4 py-3 rounded-lg border transition-all ${
                                            editing
                                                ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                : "border-gray-200 bg-gray-50 cursor-not-allowed"
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.role}
                                        disabled
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={profile.department}
                                        onChange={(e) =>
                                            handleInputChange(e, "profile")
                                        }
                                        disabled={!editing}
                                        className={`w-full px-4 py-3 rounded-lg border transition-all ${
                                            editing
                                                ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                : "border-gray-200 bg-gray-50 cursor-not-allowed"
                                        }`}
                                    />
                                </div>

                                {/* Password Change Section */}
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-yellow-800 mb-2">
                                        <FaLock className="inline mr-2" />
                                        Change Password
                                    </h3>
                                    <button className="text-sm text-yellow-700 hover:text-yellow-900 underline">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "security":
                return (
                    <div className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">
                                <FaShieldAlt className="inline mr-2" />
                                Security Settings
                            </h3>
                            <p className="text-red-700 text-sm">
                                These settings affect the security of your admin
                                account and the entire system.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Two-Factor Authentication
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Add an extra layer of security
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="twoFactorEnabled"
                                            checked={security.twoFactorEnabled}
                                            onChange={(e) =>
                                                handleInputChange(e, "security")
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Session Timeout (minutes)
                                    </label>
                                    <select
                                        name="sessionTimeout"
                                        value={security.sessionTimeout}
                                        onChange={(e) =>
                                            handleInputChange(e, "security")
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value={15}>15 minutes</option>
                                        <option value={30}>30 minutes</option>
                                        <option value={60}>1 hour</option>
                                        <option value={120}>2 hours</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password Expiry (days)
                                    </label>
                                    <input
                                        type="number"
                                        name="passwordExpiry"
                                        value={security.passwordExpiry}
                                        onChange={(e) =>
                                            handleInputChange(e, "security")
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Max Login Attempts
                                    </label>
                                    <input
                                        type="number"
                                        name="loginAttempts"
                                        value={security.loginAttempts}
                                        onChange={(e) =>
                                            handleInputChange(e, "security")
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "notifications":
                return (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                <FaBell className="inline mr-2" />
                                Notification Preferences
                            </h3>
                            <p className="text-blue-700 text-sm">
                                Configure how you want to receive system
                                notifications and updates.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(notifications).map(
                                ([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                                    >
                                        <div>
                                            <h4 className="font-medium text-gray-900 capitalize">
                                                {key
                                                    .replace(/([A-Z])/g, " $1")
                                                    .trim()}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {key === "emailNotifications" &&
                                                    "Receive notifications via email"}
                                                {key === "smsNotifications" &&
                                                    "Receive notifications via SMS"}
                                                {key === "pushNotifications" &&
                                                    "Receive browser push notifications"}
                                                {key === "weeklyReports" &&
                                                    "Get weekly system reports"}
                                                {key === "securityAlerts" &&
                                                    "Receive security-related alerts"}
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name={key}
                                                checked={value}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        "notifications",
                                                    )
                                                }
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                );

            case "system":
                return (
                    <div className="space-y-6">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-orange-800 mb-2">
                                <FaDatabase className="inline mr-2" />
                                System Configuration
                            </h3>
                            <p className="text-orange-700 text-sm">
                                These settings affect the entire system. Use
                                with caution.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Maintenance Mode
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Enable maintenance mode for the
                                            platform
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="maintenanceMode"
                                            checked={
                                                systemSettings.maintenanceMode
                                            }
                                            onChange={(e) =>
                                                handleInputChange(e, "system")
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Auto Backup
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Automatically backup system data
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="autoBackup"
                                            checked={systemSettings.autoBackup}
                                            onChange={(e) =>
                                                handleInputChange(e, "system")
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Backup Frequency
                                    </label>
                                    <select
                                        name="backupFrequency"
                                        value={systemSettings.backupFrequency}
                                        onChange={(e) =>
                                            handleInputChange(e, "system")
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="hourly">Hourly</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Max Upload Size (MB)
                                    </label>
                                    <input
                                        type="number"
                                        name="maxUploadSize"
                                        value={systemSettings.maxUploadSize}
                                        onChange={(e) =>
                                            handleInputChange(e, "system")
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "analytics":
                return (
                    <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">
                                <FaChartLine className="inline mr-2" />
                                Analytics & Reporting
                            </h3>
                            <p className="text-green-700 text-sm">
                                Configure analytics tracking and reporting
                                preferences.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-4">
                                    System Performance
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">
                                            CPU Usage
                                        </span>
                                        <span className="text-sm font-medium text-green-600">
                                            12%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full"
                                            style={{ width: "12%" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-4">
                                    Memory Usage
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">
                                            RAM
                                        </span>
                                        <span className="text-sm font-medium text-blue-600">
                                            8.2GB / 16GB
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: "51%" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-4">
                                    Database Size
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">
                                            Storage
                                        </span>
                                        <span className="text-sm font-medium text-purple-600">
                                            2.4GB
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full"
                                            style={{ width: "24%" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading settings...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Settings
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage your account and system preferences
                    </p>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                    {editing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 active:bg-blue-700"
                            >
                                <FaSave className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg font-medium transition-colors duration-200 active:bg-gray-600"
                            >
                                <FaTimes className="w-4 h-4 mr-2" />
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 active:bg-gray-700"
                        >
                            <FaEdit className="w-4 h-4 mr-2" />
                            Edit Settings
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                        activeTab === tab.id
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    <Icon className="inline w-4 h-4 mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-6">{renderTabContent()}</div>
            </div>
        </div>
    );
};

export default AdminSettings;
