import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request
) { 
    try {
        const body = await request.json();
        const { email, name, password } = body;
    
        if (!email || !name || !password) {
            return new NextResponse("Missing Information", { status: 400 });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });
    
        return NextResponse.json(user);

    } catch (error: any) {
        console.log(error, "Registation_Error");

        return new NextResponse("Internal Server Error", { status: 500 });
    }
};