"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import clsx from "clsx";

import { FullMessageType } from "@/app/types";
import Avatar from "@/app/Components/Avatar";

import ImageModals from "./ImageModals";

interface MessageBoxProps {
    isLast?: boolean;
    data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    isLast,
    data
}) => {
    const session = useSession();
    const [imgModalOpen, setImgModalOpen] = useState(false);
    
    const isOwn = session?.data?.user?.email === data?.sender?.email;

    const seenLists = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

    const classes = clsx("flex gap-3 p-4",
        isOwn && "justify-end",
    );
    const classAvatar = clsx(isOwn && "order-2");
    const classBody = clsx("flex flex-col gap-2",
        isOwn && "items-end",
    );
    const classMessage = clsx("text-sm w-fit overflow-hidden",
        isOwn ? "bg-orange-500 text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );

    return ( 
        <div className={classes}>
            <div className={classAvatar}>
                <Avatar user={data.sender} />
            </div>

            <div className={classBody}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>

                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), "p")}
                    </div>
                </div>

                <div className={classMessage}>
                    <ImageModals
                        src={data.image}
                        isOpen={imgModalOpen}
                        onClose={() => setImgModalOpen(false)}
                    />
                    {data.image ? (
                        <Image
                            alt="Image"
                            height="288"
                            width="288"
                            src={data.image}
                            onClick={() => setImgModalOpen(true)}
                            className="object-cover cursor-pointer hover:scale-110 transition translate"
                        />
                    ) : (
                        <div>
                            {data.body}
                        </div>
                    )}
                </div>
                {isLast && isOwn && seenLists.length > 0 && (
                    <div className="text-xs font-light text-gray-500">
                        {`Seen by ${seenLists}`}
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default MessageBox;