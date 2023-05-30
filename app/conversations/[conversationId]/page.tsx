
import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/Components/EmptyState";

import Header from "./components/Header";
import Body from "./components/Body";
import ConversationForm from "./components/ConversationForm";

interface IParams {
    conversationId: string;
};

const ConversationId = async ({params}: {params: IParams}) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <div className="lg-pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="flex flex-col h-full">
                <Header conversation={conversation} />
                <Body />
                <ConversationForm />
            </div>
        </div>
    );
}

export default ConversationId;