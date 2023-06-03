
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUsers from "@/app/actions/getCurrentUsers";

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) { 
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUsers();

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingConversations = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if (!existingConversations) {
            return new NextResponse("Conversation not found", { status: 404 });
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        return NextResponse.json(deletedConversation);

    } catch (error: any) {
        console.log(error, "ERROR DELETE CONVERSATION");
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}