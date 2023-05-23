"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemsProps {
    href: string;
    active?: boolean;
    icon: any;
    onClick?: () => void; 
}

const MobileItems: React.FC<MobileItemsProps> = ({
    href,
    active,
    icon: Icon,
    onClick,
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return ( 
        <Link
            href={href}
            onClick={handleClick}
            className={clsx(`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center 
            p-4 text-gray-500 hover:text-black hover:bg-gray-100`,
            active && "bg-gray-100 text-black")}
        >
            <Icon className="w-6 h-6" />
        </Link>
    );
}
 
export default MobileItems;