import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { HiChat } from "react-icons/hi";
import { CgLogOut } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";

import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: "Chat",
            href: "/conversations",
            icon: HiChat,
            active: pathname === "/conversations" || !!conversationId,
        }, 
        {
            label: "Users",
            href: "/users",
            icon: FiUsers,
            active: pathname === "/users",
        },
        {
            label: "Sign Out",
            href: "#",
            onClick: () => signOut(),
            icon: CgLogOut,
        }
    ], [pathname, conversationId,]);

    return routes;
}

export default useRoutes;