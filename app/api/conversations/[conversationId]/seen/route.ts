
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUsers from "@/app/actions/getCurrentUsers";

interface IParams { 
    conversationId?: string;
};

export async function POST(
    request: Request, 
    { params }: {params: IParams}
) {
    try {
        const currentUser = await getCurrentUsers();
        const { conversationId } = params;

        if (!currentUser?.id || !currentUser?.email) { 
            return (
                new NextResponse("Unauthorized", { status: 401 })
            );
        }

        // REMINDERS: THIS IS WHERE TO FIND THE EXISTING USER CONVERSATIONS
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    }
                },
                users: true,
            }
        });

        if (!conversation) {
            return (
                new NextResponse("Invalid ID", { status: 400 })
            );
        }

        // REMINDERS: THIS IS WHERE TO FIND THE LAST EXISTING USER CONVERSATIONS
        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return (
                NextResponse.json(conversation)
            );
        }

        // REMINDERS: IF THE LAST MESSAGE IS TRUE THEN THIS WILL BE AN UPDATE OF THE LAST SEEN MESSAGE
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id,
                    }
                }
            },
        });

        return NextResponse.json(updatedMessage);

    } catch (error: any) {
        console.log(error, "ERROR_MESSAGES_SEEN");
        return (
            new NextResponse("Internal Server Error", { status: 500 })
        );
    }
}