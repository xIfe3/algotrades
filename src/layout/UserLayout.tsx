import { useState, useEffect } from "react";
import Sidebar from "../shared/user/Sidebar";
import Navbar from "../shared/user/Navbar";
import { ReactNode } from "react";
import { useGetUserProfileQuery } from "../features/user/api/userApiSlice";
import { useLocation, OutletContextProvider } from "@/lib/router";

const UserLayout = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

    const { pathname } = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (pathname === currentPath) return;
        else {
            setCurrentPath(pathname);
            setIsOpen(false);
        }
    }, [pathname]);

    const { data } = useGetUserProfileQuery({});
    const profileData = data?.user || {};

    return (
        <div className="flex bg-lightGrey">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col w-full md:w-[80%] sm:ml-[20%]">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    username={profileData?.username}
                    email={profileData?.email}
                />
                <div className="px-1 md:px-4">
                    <OutletContextProvider value={profileData}>{children}</OutletContextProvider>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
