import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

import getCurrentUsers from "@/app/actions/getCurrentUsers";

export async function POST(
    request: Request
) {
   try {
    const currentUser = await getCurrentUsers();
    const body = await request.json();

    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
        return new NextResponse("Unathorized Personel", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name )) {
        return new NextResponse("Invalid Data", { status: 400 });
    }

    if (isGroup) {
        const newConversations = await prisma.conversation.create({
            data: {
                name,
                isGroup,
                users: {
                    connect: [
                        ...members.map((member: {value: string}) => ({
                            id: member.value
                        })),
                        {
                            id: currentUser.id
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        return NextResponse.json(newConversations);
    }

    const existingConversations = await prisma.conversation.findMany({
        where: {
            OR: [
                {
                    userIds: {
                        equals: [currentUser.id, userId]
                    }
                },
                {
                    userIds: {
                        equals: [userId, currentUser.id]
                    }
                }
            ]
        }
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
        return NextResponse.json(singleConversation);
    }

    const newConversations = await prisma.conversation.create({
        data: {
            users: {
                connect: [
                    {
                        id: currentUser.id
                    },
                    {
                        id: userId
                    }
                ]
            }
        },
        include: {
            users: true
        }
    });

    return NextResponse.json(newConversations);

   } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
   } 
}