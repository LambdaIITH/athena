import { DashboardNav } from "@/components/dashboard-nav";
import { NavItem } from "@/types";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import logo from "../assets/logo.png";


type SidebarProps = {
  className?: string;
};


const Sidebar = ({ className }: SidebarProps) => {
  const { isMinimized, toggle } = useSidebar();
  
  let navItems: NavItem[] = [];


  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-60" : "w-[72px]",
        className
      )}
    >
      <div className="hidden lg:flex flex-col items-center">
        <img
          src={logo}
          width={50}
          height={50}
          alt="Athena Logo"
          className="rounded-md"
        />
        <span className="text-lg font-semibold">
          {!isMinimized ? "Athena": ""}
        </span>
      </div>

      <ChevronLeft
        className={cn(
          "absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
