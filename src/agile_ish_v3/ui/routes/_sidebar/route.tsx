import SidebarLayout from "@/components/apx/sidebar-layout";
import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { User, Activity, Zap, AlertTriangle, LayoutDashboard } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/_sidebar")({
  component: () => <Layout />,
});

function Layout() {
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
      match: (path: string) => path === "/",
    },
    {
      to: "/nasa-equipment",
      label: "NASA Equipment",
      icon: <Activity size={16} />,
      match: (path: string) => path === "/nasa-equipment",
    },
    {
      to: "/transformer-readings",
      label: "Transformers",
      icon: <Zap size={16} />,
      match: (path: string) => path === "/transformer-readings",
    },
    {
      to: "/electrical-faults",
      label: "Electrical Faults",
      icon: <AlertTriangle size={16} />,
      match: (path: string) => path === "/electrical-faults",
    },
    {
      to: "/profile",
      label: "Profile",
      icon: <User size={16} />,
      match: (path: string) => path === "/profile",
    },
  ];

  return (
    <SidebarLayout>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg",
                    item.match(location.pathname)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarLayout>
  );
}
