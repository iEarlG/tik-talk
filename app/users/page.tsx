"use client";

import { signOut } from "next-auth/react";

const Users = () => {
    return ( 
        <div>
            

            <button onClick={() => signOut()}>Log out</button>
        </div>
    );
}
 
export default Users;