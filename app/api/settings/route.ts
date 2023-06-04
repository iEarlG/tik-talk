
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUsers from "@/app/actions/getCurrentUsers";


export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUsers();
        const body = await request.json();
        const { name, image } = body;

        if (!currentUser?.id) { 
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedUsers = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                name: name
            }
        });

        return NextResponse.json(updatedUsers);
        
    } catch (error: any) {
        console.log(error, "ERROR IN POST SETTINGS ROUTE");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}