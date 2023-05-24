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

   } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
   } 
}