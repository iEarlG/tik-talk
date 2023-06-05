
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

import ConversationLists from "./components/ConversationLists";
import Sidebar from "../Components/sidebar/Sidebar";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const conversations = await getConversations();
    const users = await getUsers();
    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <ConversationLists 
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    );
}