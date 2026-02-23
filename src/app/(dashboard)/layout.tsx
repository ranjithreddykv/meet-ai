import { SidebarProvider } from "@/components/ui/sidebar";
import {DashboardSideBar} from "@/modules/dashboard/ui/components/dashboard-sidebar";


interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSideBar />
        <main className="flex-1 bg-muted overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
};
export default Layout;
