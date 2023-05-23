
import prisma from "@/app/libs/prismadb";
import getSessions from "./getSessions";

const getCurrentUsers = async () => {
    try {
        const session = await getSessions();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;

    } catch (error: any) {
        return null;
    }
}

export default getCurrentUsers;