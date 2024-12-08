import {AppSidebar} from "@/components/app-sidebar";
import {SidebarProvider} from "@/components/ui/sidebar";

export default function ApplicationLayour({
    children,
                                          }:{
    children: React.ReactNode;
}) {
    return(
        <div className="flex">
            <SidebarProvider>
                <AppSidebar />
            </SidebarProvider>
            <div>
                {children}
            </div>
        </div>
    );

}