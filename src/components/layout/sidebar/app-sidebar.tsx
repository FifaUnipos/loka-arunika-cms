'use client';

import * as React from 'react';
import { NavMain } from '@/components/layout/sidebar/nav-main';
import { NavUser } from '@/components/layout/sidebar/nav-user';
import { TeamSwitcher } from '@/components/layout/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import menus from '@/constants/menu';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="font-outfit">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="no-scrollbar">
        <NavMain items={menus} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
