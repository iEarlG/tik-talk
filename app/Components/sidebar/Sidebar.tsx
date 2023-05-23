
import DesktopSidebar from "./DesktopSidebar";
import MobileView from "./MobileView";

async function Sidebar({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full">
            <DesktopSidebar />
            <MobileView />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;