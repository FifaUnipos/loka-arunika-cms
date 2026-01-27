import { Outlet } from 'react-router';
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { AppHeader } from '@/components/layout/header/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import FloatingNavigation from './sidebar/floating-navigation';

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AppHeader>
        <main className="flex min-h-svh flex-col items-center justify-start font-outfit">
          <Outlet />
        </main>
        <FloatingNavigation />
      </AppHeader>
    </SidebarProvider>
  );
}
