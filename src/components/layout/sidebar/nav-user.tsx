'use client';

import { CaretDownIcon, SignOutIcon } from '@phosphor-icons/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { LogoutConfirmDialog } from '@/components/layout/sidebar/logout-confirm-dialog';
import { useNavigate } from 'react-router';
import { getInitials } from '@/lib/utils';
import { logout } from '@/services/auth/auth-service';
import { useAuth } from '@/hooks/use-auth';

export function NavUser() {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const { clearAuth, user } = useAuth();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    clearAuth();

    navigate('/', { replace: true });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <SidebarMenuButton
              render={<div />}
              role="button"
              tabIndex={0}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full group/sidebarMenuButton hover:bg-primary"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  alt={user?.name || ''}
                  className="bg-muted object-fill"
                  src=""
                  loading="lazy"
                />
                <AvatarFallback className="rounded-lg">
                  {getInitials('Bayu Setiawan')}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight group-hover/sidebarMenuButton:text-white">
                <span className="truncate font-semibold">
                  {'Bayu Setiawan'}
                </span>
              </div>

              <CaretDownIcon className="ml-auto size-4 group-hover/sidebarMenuButton:text-white" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg font-outfit"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <div
              className="cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="p-0 font-normal rounded-lg hover:bg-primary hover:text-primary-foreground">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        alt={user?.name || ''}
                        className="bg-muted object-fill"
                        src={''}
                        loading="lazy"
                      />
                      <AvatarFallback className="rounded-lg">
                        {getInitials('Bayu Setiawan')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {'Bayu Setiawan'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
            </div>
            <DropdownMenuSeparator />
            <LogoutConfirmDialog
              onConfirm={handleLogout}
              trigger={
                <div className="group text-destructive cursor-pointer hover:bg-destructive px-2 py-1.5 text-sm flex items-center gap-2 rounded-lg w-full">
                  <SignOutIcon className="group-hover:text-white" width={14} />
                  <span className="group-hover:text-white">Log out</span>
                </div>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
