import Sidebar from "../Components/sidebar/Sidebar"
import getUsers from "../actions/getUsers";
import UserLists from "./components/UserLists";

export default async function UserLayout({
    children
} : {
    children: React.ReactNode;
}) {
    const users = await getUsers();
    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <UserLists items={users} />
                {children}
            </div>
        </Sidebar>
    );
}
