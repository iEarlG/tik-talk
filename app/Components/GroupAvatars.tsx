"use client";

import Image from "next/image";

import { User } from "@prisma/client";

interface GroupAvatarsProps {
    users?: User[]
}

const GroupAvatars: React.FC<GroupAvatarsProps> = ({ users = [] }) => 
{
    const splitUsers = users.slice(0, 3);
    const positioning = {
        0: "top-0 left-[12px]",
        1: "bottom-0",
        2: "bottom-0 right-0"
    };
    
    return ( 
        <div className="relative h-11 w-11">
            {splitUsers.map((user, index) => (
                <div 
                key={user.id}
                className={`absolute h-[21px] w-[21px] inline-block rounded-full overflow-hidden 
                ${positioning[index as keyof typeof positioning]}`}
                >
                    <Image 
                        alt="Group Avatar"
                        src={user?.image || "/placeholder.jpg"}
                        fill
                    />
                </div>
            ))}
        </div>
    );
}
 
export default GroupAvatars;