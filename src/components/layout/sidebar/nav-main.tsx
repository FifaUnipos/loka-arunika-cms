'use client';

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { CaretRightIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import type { MenuData, SubItemMenu } from '@/constants/menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function NavMain({ items }: { items: MenuData[] }) {
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const subItems: SubItemMenu[] = item.items ?? [];
          const isCollapsible = subItems.length > 0;

          if (!isCollapsible) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => navigate(item.url)}
                  className="hover:text-primary cursor-pointer"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <CollapsibleMenuItem
              key={item.title}
              item={item}
              subItems={subItems}
              navigate={navigate}
            />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function CollapsibleMenuItem({
  item,
  subItems,
  navigate,
}: {
  item: MenuData;
  subItems: SubItemMenu[];
  navigate: ReturnType<typeof useNavigate>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible w-full"
    >
      <SidebarMenuItem className="group/item">
        <SidebarMenuButton
          onClick={() => setOpen((v) => !v)}
          className="group-hover/item:text-primary group-hover/item:bg-accent hover:bg-accent hover:text-primary"
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>

          <CaretRightIcon
            className={cn(
              'ml-auto transition-transform duration-200',
              open && 'rotate-90',
            )}
          />
        </SidebarMenuButton>

        <CollapsibleContent>
          <SidebarMenuSub>
            {subItems.map((sub) => (
              <SidebarMenuSubItem key={sub.title}>
                <SidebarMenuSubButton
                  onClick={() => navigate(sub.url, { replace: true })}
                  className="hover:text-primary cursor-pointer"
                >
                  <span>{sub.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
