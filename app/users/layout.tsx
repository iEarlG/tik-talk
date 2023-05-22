import Sidebar from "../Components/sidebar/Sidebar"

export default async function UserLayout({
    children
} : {
    children: React.ReactNode;
}) {
    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    );
}
