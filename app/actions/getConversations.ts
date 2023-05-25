
import primsa from "@/app/libs/prismadb";
import getCurrentUsers from "./getCurrentUsers";

const getConversations = async () => {
    const currentUser = await getCurrentUsers();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const conversations = await primsa.conversation.findMany({  
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });

        return conversations;

    } catch (error: any) {
        return [];
    }
}

export default getConversations;