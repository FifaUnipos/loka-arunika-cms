import { SidebarInset } from '@/components/ui/sidebar';
import { PageTitle } from '@/components/layout/header/sidebar-title-page';

export function AppHeader({ children }: React.PropsWithChildren) {
  return (
    <SidebarInset>
      <header className="flex h-0 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 font-outfit md:h-16">
        <PageTitle />
      </header>
      {children}
    </SidebarInset>
  );
}
