"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListsProps {
    items: User[]
};

const UserLists: React.FC<UserListsProps> = ({ items }) => {
    return ( 
        <aside className="fixed w-full block lg:block lg:w-80 inset-y-0 pb-20 lg:pb-0 lg:left-20 left-0 overflow-y-auto 
            border-r border-gray-200"
        >
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-2xl font-bold text-neutral-800 py-4">
                        Friends
                    </div>
                </div>

                {items.map((item) => (
                    <UserBox 
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </aside>
    );
}
 
export default UserLists;