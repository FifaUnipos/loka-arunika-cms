'use client';

import { DropdownMenu } from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import LOGO_LOKA_ARUNIKA from '@/assets/Logo-Horizontal/SVG/loka-arunika-logo-horizontal-primary.svg';

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-white flex aspect-video size-full items-center justify-center rounded-lg">
              <img src={LOGO_LOKA_ARUNIKA} alt={'logo-loka-arunika'}></img>
            </div>
          </SidebarMenuButton>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
