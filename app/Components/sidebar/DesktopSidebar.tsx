"use client";

import { useState } from "react";
import { User } from "@prisma/client";

import useRoutes from "@/app/hooks/useRoutes";
import DesktopItems from "./DesktopItems";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const routes = useRoutes();

    // console.log({currentUser});

    return ( 
        <>
            <SettingsModal 
                currentUser={currentUser}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}   
            />

            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 
            lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between ">
                <nav className="mt-4 flex flex-col justify-between">
                    <ul className="flex flex-col items-center space-y-1" role="list">
                        {routes.map((item) => 
                            <DesktopItems 
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                active={item.active}
                                icon={item.icon}
                                onClick={item.onClick}
                            />
                        )}
                    </ul>
                </nav>

                <nav className="flex flex-col justify-between mt-4 items-center">
                    <div 
                        className="cursor-pointer hover:opacity-75 transition" 
                        onClick={() => setIsOpen(true)}
                    >
                        <Avatar 
                            user={currentUser}
                        />
                    </div>
                </nav>
            </div>     
        </>
    );
}
 
export default DesktopSidebar;