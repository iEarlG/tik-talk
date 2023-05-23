"use client";

import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "@/app/hooks/useConversation";

import MobileItems from "./MobileItems";

const MobileView = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) { 
        return null;
    };

    return ( 
        <div className="fixed flex items-center justify-between w-full bottom-0 z-40 bg-white border-t-[1px]
            lg:hidden"
        >
            {routes.map((route) => (
                <MobileItems 
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                    onClick={route.onClick}
                />
            ))}
        </div>
    );
}
 
export default MobileView;