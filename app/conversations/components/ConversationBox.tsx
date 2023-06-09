"use client";

import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";

import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/Components/Avatar";
import GroupAvatars from "@/app/Components/GroupAvatars";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data, selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [router, data.id]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];

    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;

    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray.filter((user) => user.email === userEmail).length !== 0;

    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image"
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return "Start a new message"

    }, [lastMessage]);

    return ( 
        <div
            className={clsx(`w-full relative flex items-center space-x-4 p-3 hover:bg-neutral-200 rounded-xl transition cursor-pointer`,
            selected ? "bg-neutral-100" : "hover:bg-white")}
            onClick={handleClick}
        >
            {data.isGroup ? (
                <GroupAvatars users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}

            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center">
                        <p className="text-md font-medium text-gray-900">{data.name || otherUser.name}</p>

                        {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400 font-light">
                                {format(new Date(lastMessage.createdAt), "p")}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`truncate text-sm`,
                    hasSeen ? "text-gray-500" : "text-neutral-900 font-medium")}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default ConversationBox;