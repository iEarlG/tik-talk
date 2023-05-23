
import getCurrentUsers from "@/app/actions/getCurrentUsers";

import DesktopSidebar from "./DesktopSidebar";
import MobileView from "./MobileView";

async function Sidebar({ children }: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUsers();
    return (
        <div className="h-full">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileView />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;