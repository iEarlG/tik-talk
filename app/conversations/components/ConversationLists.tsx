"use client";

import { FullConversationType } from "@/app/types";

interface ConversationListsProps {
    initialItems: FullConversationType[];
}

const ConversationLists: React.FC<ConversationListsProps> = ({
    initialItems
}) => {
    return ( 
        <div>ConversationLists</div>
    );
}
 
export default ConversationLists;