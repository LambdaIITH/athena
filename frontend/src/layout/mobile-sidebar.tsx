import { DashboardNav } from '@/components/dashboard-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from "../pages/auth/providers/AuthContext";
import { NavItem } from '@/types';
// import { Playlist } from "../data/playlists";

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[];
// }

export function MobileSidebar(
  // { className }: SidebarProps
) {

  const { } = useAuth();
  const [open, setOpen] = useState(false);
  let navItems: NavItem[];
  navItems = [];
  navItems = [...new Set([...navItems])];

return (
  <>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="focus:outline-none">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="!px-0">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Overview
            </h2>
            <div className="space-y-1">
              <DashboardNav
                items={navItems}
                isMobileNav={true}
                setOpen={setOpen}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </>
);
}
