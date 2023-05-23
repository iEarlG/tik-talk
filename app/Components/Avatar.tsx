"use client";

import { User } from "@prisma/client";

interface AvatarProps {
    user?: User 
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return ( 
        <div>Avatar</div>
    );
}
 
export default Avatar;