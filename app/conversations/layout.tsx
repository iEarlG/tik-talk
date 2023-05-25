
import getConversations from "../actions/getConversations";
import ConversationLists from "./components/ConversationLists";

import Sidebar from "../Components/sidebar/Sidebar";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const conversations = await getConversations();
    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <ConversationLists 
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    );
}