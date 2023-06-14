"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { User } from "@prisma/client";
import { FullConversationType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";

import { MdOutlineGroupAdd } from "react-icons/md";

import ConversationBox from "./ConversationBox";
import GroupChatModals from "./GroupChatModals";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListsProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationLists: React.FC<ConversationListsProps> = ({
    initialItems,
    users
}) => {
    const router = useRouter();
    const session = useSession();
    const { isOpen, conversationId } = useConversation();

    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) { 
            return;
        }

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) { 
                    return current;
                }
                return [conversation, ...current];
            });
        };
        
        const updateHandler  = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) { 
                    return {
                        ...currentConversation,
                        messages: conversation.messages,
                    }
                }

                return currentConversation;
            }))
        };

        const removedHadler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((convo) => convo.id !== conversation.id)]
            });

            if (conversationId === conversation.id) { 
                router.push("/conversations");
            }
        };

        pusherClient.subscribe(pusherKey);
        pusherClient.bind("conversation:new", newHandler);
        pusherClient.bind("conversation:update", updateHandler);
        pusherClient.bind("conversation:removed", removedHadler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("conversation:new", newHandler);
            pusherClient.unbind("conversation:update", updateHandler);
            pusherClient.unbind("conversation:removed", removedHadler);
        }

    }, [pusherKey, conversationId, router]);
    return ( 
        <>
            <GroupChatModals 
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside
                className={clsx(`fixed lg:w-80 lg:block inset-y-0 pb-20 lg:pb-0 lg:left-20 overflow-y-auto border-r border-gray-200`,
                isOpen ? "hidden" : "block w-full left-0")}
            >
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>

                        <div 
                            className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>

                    {items.map((item) => (
                        <ConversationBox 
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />
                    ))}
                </div>
            </aside>
        </>
    );
}
 
export default ConversationLists;