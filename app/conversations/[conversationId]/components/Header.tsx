"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/Components/Avatar";

import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import { HiPhone } from "react-icons/hi";

interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    };
}

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {
    const otherUser = useOtherUser(conversation);

    const activeStatus = useMemo(() => {
        if (conversation.isGroup) { 
            return (
                `${conversation.users.length} members`
            );
        }

        return "Active"
    }, [conversation]);

    return ( 
        <div className="w-full flex justify-between items-center bg-white border-b-[1px] 
        sm:px-4 lg:px-6 py-3 shadow-sm"
        >
            <div className="flex items-center gap-3">
                <Link
                    href="/conversations"
                    className="lg:hidden block text-orange-500 hover:text-orange-600 cursor-pointer transition"
                >
                    <HiChevronLeft size={32} />
                </Link>

                <Avatar user={otherUser} />
                <div className="flex flex-col">
                    <div>
                        {conversation.name || otherUser.name}
                    </div>
                    <div className="text-sm font-light text-neutral-500">
                        {activeStatus}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal 
                size={32} 
                onClick={() => {}}
                className="text-orange-500 hover:text-orange-600 cursor-pointer transition"
            />
        </div>
    );
}
 
export default Header;